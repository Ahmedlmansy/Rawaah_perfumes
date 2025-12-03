"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Package,
  Droplets,
  Calendar,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Product = {
  name: string;
  brand: string;
  price: number;
  discount_price?: number;
  type: string;
  image: string;
  size: string;
  stock: number;
  Best_Sellers: boolean;
  season: string;
  description: string;
  notes: string[];
};

const product: Product = {
  name: "His Confession",
  brand: "Rawaah Perfumes",
  price: 150,
  discount_price: 130,
  type: "Unisex",
  image:
    "https://qgzzibqbccnvcmxupbva.supabase.co/storage/v1/object/public/products/His_Confession.avif",
  size: "50ml",
  stock: 18,
  Best_Sellers: true,
  season: "Summer",
  description:
    "A luxurious fragrance that combines freshness with warm woody notes for a long‑lasting elegant scent.",
  notes: ["Jasmine", "Bergamot", "Sandalwood", "Amber"],
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = product.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image  */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-[#A78B64]/20 shadow-xl">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 aspect-square flex items-center justify-center">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.Best_Sellers && (
                      <Badge className="bg-[#A78B64] hover:bg-[#8B7355] text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Best Seller
                      </Badge>
                    )}
                    {product.discount_price && (
                      <Badge variant="destructive" className="shadow-lg">
                        -{discountPercent}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-lg bg-white/90 hover:bg-white"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-lg bg-white/90 hover:bg-white"
                    >
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover p-8 transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-[#A78B64]/20">
                <CardContent className="p-4 text-center">
                  <Truck className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">
                    Free Shipping
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#A78B64]/20">
                <CardContent className="p-4 text-center">
                  <Shield className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">Authentic</p>
                </CardContent>
              </Card>
              <Card className="border-[#A78B64]/20">
                <CardContent className="p-4 text-center">
                  <Gift className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">Gift Wrap</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Details  */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="border-[#A78B64] text-[#A78B64] font-semibold"
              >
                {product.brand}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
                  {product.type}
                </Badge>
                {/* <Badge className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
                  {product.type}
                </Badge> */}
              </div>
            </div>

            <Separator className="bg-[#A78B64]/20" />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-[#A78B64]">
                  ${product.discount_price ?? product.price}
                </span>
                {product.discount_price && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              {product.discount_price && (
                <p className="text-sm text-green-600 font-medium">
                  You save ${product.price - product.discount_price} (
                  {discountPercent}% off)
                </p>
              )}
            </div>

            <Separator className="bg-[#A78B64]/20" />

            {/*  Info */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
                <CardContent className="p-4 text-center">
                  <Package className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium mb-1">Size</p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.size}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
                <CardContent className="p-4 text-center">
                  <Droplets className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Stock
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.stock}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Season
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {product.season}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs  */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#A78B64]/10">
                <TabsTrigger
                  value="description"
                  className="data-[state=active]:bg-[#A78B64] data-[state=active]:text-white"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-[#A78B64] data-[state=active]:text-white"
                >
                  Fragrance Notes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4 mt-4">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-[#A78B64]/30 text-[#A78B64] hover:bg-[#A78B64] hover:text-white transition-colors px-4 py-2 text-sm"
                    >
                      {note}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-[#A78B64]/30 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[#A78B64]/10 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-6 py-2 font-semibold text-gray-900">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[#A78B64]/10 rounded-none"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                >
                  +
                </Button>
              </div>
            </div>

            {/* add to cart  */}
            <div className="space-y-3 pt-4">
              <Button className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10 h-12"
              >
                Buy Now
              </Button>
            </div>

            {/* Stock Warning */}
            {product.stock < 20 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                ⚠️ Only {product.stock} items left in stock - order soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
