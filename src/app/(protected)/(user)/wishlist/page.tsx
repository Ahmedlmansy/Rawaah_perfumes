"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchWishlist, removeFromWishlistApi } from "@/store/apis/wishlistApi";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CenterTitle from "@/components/ui/CenterTitle";

const WishlistPage = () => {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const [user, setUser] = useState<User | null>(null);
  
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user?.id, dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <CenterTitle title="My Wishlist" />
          </div>

          {/* Wishlist Items */}
          {items.length === 0 ? (
            <Card className="border-[#A78B64]/20">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-[#A78B64]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-[#A78B64]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Your Wishlist is Empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Start adding your favorite fragrances to save them for later!
                </p>
                <Button
                  onClick={() => (window.location.href = "/products")}
                  className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((product) => {
                  const discountPercent = product.discount_price
                    ? Math.round(
                        ((product.price - product.discount_price) /
                          product.price) *
                          100
                      )
                    : 0;

                  return (
                    <Card
                      key={product.id}
                      className="border-[#A78B64]/20 hover:shadow-lg transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Image */}
                          <div className="relative w-full md:w-48 aspect-square bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-lg flex-shrink-0 overflow-hidden">
                            {product.discount_price && (
                              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 z-10">
                                -{discountPercent}%
                              </Badge>
                            )}
                            {product.stock === 0 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                                <Badge className="bg-red-600 hover:bg-red-700">
                                  Out of Stock
                                </Badge>
                              </div>
                            )}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover p-4"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-2"></div>
                                <p className="text-sm text-gray-500 mb-1">
                                  {product.brand}
                                </p>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Size: {product.size}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-3xl font-bold text-[#A78B64]">
                                ${product.discount_price || product.price}
                              </span>
                              {product.discount_price && (
                                <>
                                  <span className="text-lg text-gray-400 line-through">
                                    ${product.price}
                                  </span>
                                  <Badge className="bg-green-100 text-green-700 border-green-200">
                                    Save $
                                    {product.price - product.discount_price}
                                  </Badge>
                                </>
                              )}
                            </div>

                            <div className="mt-auto flex gap-3">
                              <Button
                                disabled={product.stock === 0}
                                className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] disabled:opacity-50"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                variant="outline"
                                className="border-[#A78B64]/30"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                <Link href={`/products/${product.id}`}>
                                  View Details
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                className="border-red-300 text-red-500 hover:bg-red-50"
                                onClick={() => {
                                  if (!user) return;

                                  dispatch(
                                    removeFromWishlistApi({
                                      userId: user.id,
                                      productId: product.id,
                                    })
                                  )
                                    .unwrap()
                                    .then(() => {
                                      dispatch(fetchWishlist(user.id));
                                    });
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
