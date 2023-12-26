import React from "react";
import { ProductCard } from "./ProductCard";

export const AllProducts = ({ productsData }) => {
  return (
    <section className="grid grid-cols-3 gap-12">
      {productsData.map(({ id, name, slug, price, featuredImage, user }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            name={name}
            slug={slug}
            price={price}
            featuredImage={featuredImage}
            username={user.username}
          />
        );
      })}
    </section>
  );
};
