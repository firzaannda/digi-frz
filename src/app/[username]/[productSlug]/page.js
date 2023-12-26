import { apiUrl, imageUrl } from "@/config/apiUrl";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

async function getData(productSlug) {
  const res = await fetch(`${apiUrl}/products?slug=${productSlug}`);
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const { username, productSlug } = params;
  const { data } = await getData(productSlug);
  console.log(data);
  return (
    <main className="space-y-12">
      <section className="flex justify-between">
        <div className="space-y-2">
          <h1>{data.name}</h1>
          <div className="flex gap-2 items-center">
            <div className="bg-zinc-100 text-black font-medium px-3 py-1 rounded-full space-y-4">
              {data.user.username}
            </div>
            <div>{data.category}</div>
          </div>
        </div>
        <Button color="primary">Add to Cart - ${data.price}</Button>
      </section>

      <section className="grid grid-cols-2 gap-8">
        <Image
          src={`${imageUrl}/tr:h-500/${data.id}/${data.featuredImage}`}
          alt={data.name}
          width={800}
          height={800}
          className="rounded-xl"
        />
        {data.images.map((image) => {
          return (
            <div key={image}>
              <Image
                src={`${imageUrl}/tr:h-500/${data.id}/${image}`}
                alt={data.name}
                width={800}
                height={800}
                className="rounded-xl"
              />
            </div>
          );
        })}
      </section>

      <section className="space-y-2">
        <h3>Description</h3>
        <p className="whitespace-pre-wrap">{data.description}</p>
      </section>
    </main>
  );
}
