"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CenterTitle from "@/components/ui/CenterTitle";
import { fetchProducts } from "@/store/features/allProductsSlice";

export default function BrandDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const brandName = decodeURIComponent(id as string);

  const { items } = useSelector((state: RootState) => state.products);

  const [page, setPage] = useState(1);
  const limit = 6;

  const filteredProducts = useMemo(() => {
    return items.filter((product) => product.brand === brandName);
  }, [items, brandName]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const visibleProducts = useMemo(() => {
    const from = (page - 1) * limit;
    const to = from + limit;
    return filteredProducts.slice(from, to);
  }, [page, filteredProducts]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="p-8 container mx-auto">
      <CenterTitle title={`${brandName}`} />
      {visibleProducts.length === 0 ? (
        <p> 0 products for {brandName} </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}
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
      </div>{" "}
    </div>
  );
}
