"use client";
import ProductCard from "@/components/ProductCard";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    console.log("Dispatching fetchProducts...");
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(items);
  if (loading) {
    return <div className="p-8 container mx-auto">Loading Products...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 container mx-auto">Error: {error}</div>
    );
  }
  console.log(items);

  return (
    <div>
      <div className="p-8 container mx-auto">
        {items.length === 0 ? (
          <p>No Products found</p>
        ) : (
          <div className="">
            <div className="grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {items.map((product) => (
                <Link key={product.id} href={`shop/${product.name}`}>
                  <ProductCard {...product} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
