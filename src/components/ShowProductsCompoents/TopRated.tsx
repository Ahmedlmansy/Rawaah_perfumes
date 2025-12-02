import React from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/types/products";
import { productsShow } from "@/data/products";
export default function TopRated() {
  return (
    <div>
      {" "}
      <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        {productsShow.map((product: Product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
