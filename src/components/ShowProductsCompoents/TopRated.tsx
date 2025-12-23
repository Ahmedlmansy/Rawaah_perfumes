import React, { useEffect } from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/types/products";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import Link from "next/link";
export default function TopRated() {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.products);

  const products = [...items].sort(() => Math.random() - 0.5).slice(0, 8);
  console.log(items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-auto-rows-[1fr] mt-8">
        {products.map((product: Product) => (
          <Link href={`products/${product.id}`} key={product.id}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
