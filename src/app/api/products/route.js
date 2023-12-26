import { uploadFile } from "@/lib/uploadFile";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  let products = null;

  try {
    if (slug) {
      const product = await prisma.product.findUnique({
        where: {
          slug,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      return NextResponse.json({
        data: product,
        message: "Product fetched successfully",
      });
    }
    products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({
      data: products,
      message: "All Products Fetched Successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error fetching!",
    });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const featuredImage = formData.get("featuredImage");
  const images = formData.getAll("images");
  const category = formData.get("category");
  // const userId = formData.get("userId");

  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  let productId = "";
  //
  try {
    const allImages = [];
    images.forEach((image) => {
      allImages.push(image.name);
    });

    const createProduct = await prisma.product.create({
      data: {
        name,
        slug: slugify(name, { lower: true, replacement: "-" }),
        description,
        price: Number(price),
        featuredImage: featuredImage.name,
        images: allImages,
        category,
        userId,
      },
    });

    productId = createProduct.id;
    console.log(createProduct);
  } catch (error) {
    console.log(error);
  }

  // Send Image ke AWS S3
  try {
    //   Upload featured image file
    const uploadFeaturedImage = await uploadFile({
      Body: featuredImage,
      Key: featuredImage.name,
      ContentType: featuredImage.type,
      Dir: `products/${productId}`,
    });
    console.log(uploadFeaturedImage);

    //   Upload images file
    images.forEach(async (item) => {
      const uploadFeaturedImage = await uploadFile({
        Body: item,
        Key: item.name,
        ContentType: item.type,
        Dir: `products/${productId}`,
      });
      console.log(uploadFeaturedImage);
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json(
    {
      message: "Product created successfully",
    },
    { status: 201 }
  );
}
