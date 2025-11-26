"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { useEffect } from "react";
import { fetchBrands } from "@/store/features/brandSlice";
import CenterTitle from "@/components/ui/CenterTitle";
import Link from "next/link";

export default function Brands() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  if (loading) {
    return <div className="p-8 container mx-auto">Loading brands...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 container mx-auto">Error: {error}</div>
    );
  }

  return (
    <div className="p-8 container mx-auto">
      {items.length === 0 ? (
        <p>No brands found</p>
      ) : (
        <div className="">
          <CenterTitle title="Brands" />
          <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((brand) => (
              <Link key={brand.id} href={`brands/${brand.name}`}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition h-[300px] ">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="  rounded mb-4 w-full  h-[200px] "
                  />
                  <h3 className="text-xl font-semibold">{brand.name}</h3>
                  <p className="text-gray-600">{brand.brand_type}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
