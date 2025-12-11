"use client";
import React, { useEffect, useState } from "react";
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
import { fetchProductDetails } from "@/store/features/getProductDetailsSlice";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { addToCartApi } from "@/store/apis/cartApi";
import { Product } from "@/types/products";
import { toast } from "sonner";
import {
  addToWishlistApi,
  removeFromWishlistApi,
  fetchWishlist,
} from "@/store/apis/wishlistApi";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.productDetails
  ) as {
    data: Product | null;
    loading: boolean;
    error: string | null;
  };
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const { user } = useSupabaseUser();

  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Fetch product details
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // Fetch wishlist when user is available
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user?.id, dispatch]);

  // Sync isFavorite with wishlist items
  useEffect(() => {
    if (data?.id) {
      const isInWishlist = wishlistItems.some((wishlistItem) => {
        // Check if items is an array and contains our product
        if (Array.isArray(wishlistItem.items)) {
          return wishlistItem.items.some(
            (product: Product) => product.id === data.id
          );
        }
        return false;
      });
      setIsFavorite(isInWishlist);
    }
  }, [wishlistItems, data?.id]);

  if (loading) return <p>loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const discountPercent =
    data.discount_price && data.price
      ? Math.round(((data.price - data.discount_price) / data.price) * 100)
      : 0;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("You must login first");
      return;
    }
    const result = await dispatch(
      addToCartApi({
        userId: user.id,
        product: {
          id: data.id,
          name: data.name,
          brand: data.brand,
          price: data.price,
          discount_price: data.discount_price,
          image: data.image,
          size: data.size,
        },
        quantity: quantity,
      })
    );

    if (addToCartApi.fulfilled.match(result)) {
      toast.success("Added to cart!");
    } else {
      toast.error("Failed to add to cart!");
    }
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("You must login first");
      return;
    }

    // Optimistic update
    setIsFavorite(!isFavorite);

    try {
      if (isFavorite) {
        // Remove from wishlist
        await dispatch(
          removeFromWishlistApi({
            userId: user.id,
            productId: data.id,
          })
        ).unwrap();

        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        await dispatch(
          addToWishlistApi({
            product: {
              id: data.id,
              name: data.name,
              brand: data.brand,
              price: data.price,
              discount_price: data.discount_price,
              image: data.image,
              size: data.size,
              type: data.type,
            },
          })
        ).unwrap();

        toast.success("Added to wishlist");
      }
    } catch (error) {
      // Revert on error
      setIsFavorite(!isFavorite);
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    }
  };

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
                    {data.Best_Sellers && (
                      <Badge className="bg-[#A78B64] hover:bg-[#8B7355] text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Best Seller
                      </Badge>
                    )}
                    {data.discount_price && (
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
                      onClick={handleWishlistToggle}
                    >
                      <Heart
                        className={`w-5 h-5 transition-all duration-300 ${
                          isFavorite
                            ? "fill-red-500 text-red-500 scale-110"
                            : "text-gray-600 hover:text-red-400"
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
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full p-8 transform hover:scale-105 transition-transform duration-500"
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
                {data.brand}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {data.name}
              </h1>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
                  {data.type}
                </Badge>
              </div>
            </div>

            <Separator className="bg-[#A78B64]/20" />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-[#A78B64]">
                  ${data.discount_price ?? data.price}
                </span>
                {data.discount_price && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${data.price}
                  </span>
                )}
              </div>
              {data.discount_price && (
                <p className="text-sm text-green-600 font-medium">
                  You save ${data.price - data.discount_price} (
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
                  <p className="text-lg font-bold text-gray-900">{data.size}</p>
                </CardContent>
              </Card>

              <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
                <CardContent className="p-4 text-center">
                  <Droplets className="w-6 h-6 text-[#A78B64] mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Stock
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {data.stock}
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
                    {data.season}
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
                  {data.description}
                </p>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {data.notes?.map((note, i) => (
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
                  onClick={() => {
                    if (data.stock !== undefined) {
                      setQuantity(Math.min(data.stock, quantity + 1));
                    }
                  }}
                >
                  +
                </Button>
              </div>
            </div>

            {/* add to cart  */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={handleAddToCart}
              >
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
            {(data.stock ?? 0) < 20 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                Only {data.stock ?? 0} items left in stock - order soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
