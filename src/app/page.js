import { AllProducts } from "@/components/products/AllProducts";
import { ProductCard } from "@/components/products/ProductCard";
import Header from "@/components/sharedUI/Header";
import { apiUrl, imageUrl } from "@/config/apiUrl";
// import Image from "next/image";
// import Link from "next/link";

async function getData() {
  const res = await fetch(`${apiUrl}/products`);
  const data = res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();
  return (
    <main className="max-w-5xl m-auto py-8 space-y-20">
      <Header />

      <section className="text-center w-[700px] m-auto">
        <h3>
          8,211 curated design resources to speed up your creative workflow.
        </h3>
        Join a growing family of 725,460 designers and makers from around the
        world.
      </section>

      <AllProducts productsData={data} />
    </main>
  );
}
