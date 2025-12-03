"use client";

import ShopFiltersDrawer from "@/components/FilterProducts";
import ProductCard from "@/components/ProductCard";
import CenterTitle from "@/components/ui/CenterTitle";
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

  // Filter states
  const [price, setPrice] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<
    "alpha" | "alphaDesc" | "priceAsc" | "priceDesc"
  >("alpha");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return items
      .filter(
        (p) =>
          p.price >= price[0] &&
          p.price <= price[1] &&
          (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
          (selectedSeason.length === 0 || selectedSeason.includes(p.season)) &&
          (selectedType.length === 0 || selectedType.includes(p.type))
      )
      .sort((a, b) => {
        switch (sortOption) {
          case "alpha":
            return a.name.localeCompare(b.name);
          case "alphaDesc":
            return b.name.localeCompare(a.name);
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [items, price, selectedBrands, selectedSeason, selectedType, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const visibleProducts = useMemo(() => {
    const from = (page - 1) * limit;
    const to = from + limit;
    return filteredProducts.slice(from, to);
  }, [page, filteredProducts]);

  if (loading)
    return <div className="p-8 container mx-auto">Loading Products...</div>;
  if (error)
    return (
      <div className="p-8 text-red-500 container mx-auto">Error: {error}</div>
    );

  return (
    <div className="p-8 container mx-auto">
      <div className="mx-5">
        <CenterTitle title="Shop All" />
      </div>
      <div className="mb-6">
        <ShopFiltersDrawer
          price={price}
          setPrice={setPrice}
          sortOption={sortOption}
          setSortOption={setSortOption}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>

      {visibleProducts.length === 0 ? (
        <p>No Products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <Link key={product.id} href={`products/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
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
