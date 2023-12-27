import React from "react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingBag } from "lucide-react";

export const ProductCard = ({
  id,
  username,
  slug,
  name,
  featuredImage,
  price,
}) => {
  return (
    <div className="relative">
      <div className="absolute z-10 flex justify-center items-center gap-4 opacity-0 hover:opacity-100 w-full h-full bg-black/20 transition duration-200">
        <Link href={`/${username}/${slug}`}>
          <Eye />
        </Link>
        <ShoppingBag />
      </div>
      <Image
        alt={name}
        src={`${imageUrl}/tr:h-320/${id}/${featuredImage}`}
        width={400}
        height={400}
        className="rounded-lg "
      />
      <div className="flex justify-between mt-4">
        <div>{name}</div>
        <div>${price}</div>
      </div>
    </div>
  );
};
