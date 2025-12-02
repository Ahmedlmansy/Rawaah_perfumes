import React from "react";
import ProductCard from "../ProductCard";
import { productsShow } from "@/app/page";
import { Product } from "@/types/products";

export default function BestSeller() {
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 
                grid-auto-rows-[1fr] mt-8"
      >
        {productsShow.map((product: Product) => (
          <div key={product.id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
