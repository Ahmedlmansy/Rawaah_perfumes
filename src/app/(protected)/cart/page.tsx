"use client";
import React, { useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  clearCartApi,
  fetchCart,
  removeFromCartApi,
  updateQtyApi,
} from "@/store/apis/cartApi";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSupabaseUser();

  const { items } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    if (loading) return;
    if (!user) return;

    dispatch(fetchCart(user.id));
  }, [user, loading, dispatch]);
  if (!user) return;
  if (loading) {
    return <p> loading... </p>;
  }

  //  Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-stone-50/50">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto text-center border-[#A78B64]/20">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-[#A78B64]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-[#A78B64]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <Button
                className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
                onClick={() => (window.location.href = "/")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-stone-50/50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <Badge className="bg-[#A78B64] hover:bg-[#8B7355] text-lg px-4 py-2">
              {items.reduce((sum, item) => sum + item.quantity, 0)} Items
            </Badge>
          </div>
          <Button
            variant="ghost"
            className="text-[#A78B64] hover:text-[#8B7355] hover:bg-[#A78B64]/10"
            onClick={() => (window.location.href = "/products")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-[#A78B64]/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Items</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    dispatch(clearCartApi(""));
                  }}
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => {
                  const price =
                    item.product.discount_price ?? item.product.price;
                  const originalPrice = item.product.price;
                  const hasDiscount = item.product.discount_price !== undefined;

                  return (
                    <div key={item.product.id}>
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-lg p-2 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {item.product.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {item.product.size}
                              </Badge>
                            </div>

                            {/*remove*/}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                dispatch(
                                  removeFromCartApi({
                                    userId: user.id,
                                    productId: item.product.id,
                                  })
                                );
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Price &  quantity */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Price */}
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-[#A78B64]">
                                ${price}
                              </span>
                              {hasDiscount && (
                                <span className="text-sm text-gray-400 line-through">
                                  ${originalPrice}
                                </span>
                              )}
                            </div>

                            {/* quantity state   */}
                            <div className="flex items-center gap-2 border border-[#A78B64]/30 rounded-lg overflow-hidden">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-[#A78B64]/10 rounded-none h-9 w-9 p-0"
                                disabled={item.quantity <= 1}
                                onClick={() =>
                                  dispatch(
                                    updateQtyApi({
                                      userId: user.id,
                                      productId: item.product.id,
                                      quantity: Math.max(1, item.quantity - 1),
                                    })
                                  )
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-[#A78B64]/10 rounded-none h-9 w-9 p-0"
                                onClick={() =>
                                  dispatch(
                                    updateQtyApi({
                                      userId: user.id,
                                      productId: item.product.id,
                                      quantity: Math.max(1, item.quantity + 1),
                                    })
                                  )
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/*  Subtotal */}
                          <div className="mt-2 text-right">
                            <span className="text-sm text-gray-500">
                              Subtotal:
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ${(price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {items[items.length - 1].product.id !==
                        item.product.id && (
                        <Separator className="mt-4 bg-[#A78B64]/10" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-[#A78B64]/20 sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    $
                    {items.reduce(
                      (sum, item) =>
                        sum +
                        (item.product.discount_price || item.product.price) *
                          item.quantity,
                      0
                    )}{" "}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">$0</span>
                </div>

                {/* Free Shipping Progress */}

                <Separator className="bg-[#A78B64]/20" />

                {/* Total */}
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#A78B64]">
                    $
                    {items.reduce(
                      (sum, item) =>
                        sum +
                        (item.product.discount_price || item.product.price) *
                          item.quantity,
                      0
                    )}{" "}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-3">
                <Button className="w-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <Link href={"/checkout"}>Proceed to Checkout</Link>
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-500 text-center">
                  <p className="flex gap-2 itmes-center">
                    <TriangleAlert color="#A78B64" size={20} />
                    <span>Secure checkout with SSL encryption</span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
