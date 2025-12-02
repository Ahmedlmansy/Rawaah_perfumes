// ProductCard.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Products } from "@/store/features/allProductsSlice";

export default function ProductCard(product: Products) {
  return (
    <Card className="max-w-sm mx-auto h-full flex justify-between flex-col bg-white/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
      {/* image  */}
      <div className="relative flex justify-center">
        <div className="  w-[200px] h-[250px]">
          <Image
            src={product?.image}
            alt={product?.name}
            width={200}
            height={200}
            className=" object-cover transform transition-transform duration-500 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* golden  */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber-100/40 text-amber-800 backdrop-blur-sm border border-amber-200/30">
            {product.type}
          </span>
        </div>

        {/* size pill  */}
        <div className="absolute right-3 top-3">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-[#4A3528] text-white font-medium">
            {product?.size} ml
          </span>
        </div>
      </div>

      <CardContent className="px-6 py-5">
        <h3 className="text-lg font-semibold text-amber-800">
          {product?.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{product?.brand}</p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold text-amber-900">
              {product?.price}$
            </div>
            {/* <div className="text-xs text-muted-foreground">Tax incl.</div> */}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="default"
              className="rounded-full px-5 py-2 shadow-md hover:scale-105 transition-transform"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
