"use client";

import ProductCard from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Shop() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, error, loading } = useSelector(
    (state: RootState) => state.products
  );

  const [page, setPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalPages = Math.ceil(items.length / limit);

  const visibleProducts = useMemo(() => {
    const from = (page - 1) * limit;
    const to = from + limit;
    return items.slice(from, to);
  }, [page, items]);

  if (loading) {
    return <div className="p-8 container mx-auto">Loading Products...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 container mx-auto">Error: {error}</div>
    );
  }

  return (
    <div>
      <div className="p-8 container mx-auto">
        {items.length === 0 ? (
          <p>No Products found</p>
        ) : (
          <div className="grid grid-cols-2 mt-8 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <Link key={product.id} href={`products/${product.id}`}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center my-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
