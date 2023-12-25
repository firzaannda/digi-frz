import { uploadFile } from "@/lib/uploadFile";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({
      data: allProducts,
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
  const userId = formData.get("userId");

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