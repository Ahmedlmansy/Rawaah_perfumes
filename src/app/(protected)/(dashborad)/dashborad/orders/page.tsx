"use client";
import React, { useEffect } from "react";
import { ShoppingCart, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import OrdersTabs from "@/components/DashboardCompoents/OrdersCompoents/OrdersTabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchOrdersApi } from "@/store/apis/ordersApi";

const OrdersPage = () => {
  const { items } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOrdersApi());
  }, []);
  console.log(items);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-8 h-8 text-[#A78B64]" />
              Orders Management
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage customer orders
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-[#A78B64]/20">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-yellow-700 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {items.filter((order) => order.status === "pending").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-blue-700 mb-1">Processing</p>
                <p className="text-2xl font-bold text-blue-700">
                  {
                    items.filter((order) => order.status === "processing")
                      .length
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-purple-700 mb-1">Shipped</p>
                <p className="text-2xl font-bold text-purple-700">
                  {items.filter((order) => order.status === "shipped").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-green-700 mb-1">Delivered</p>
                <p className="text-2xl font-bold text-green-700">
                  {items.filter((order) => order.status === "delivered").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-red-700 mb-1">Cancelled</p>
                <p className="text-2xl font-bold text-red-700">
                  {items.filter((order) => order.status === "cancelled").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-[#A78B64] mb-1">Revenue</p>
                <p className="text-xl font-bold text-[#A78B64]">
                  {items.reduce((acc, order) => acc + order.total, 0)}$
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 
        Search & Orders Tabs */}
        <OrdersTabs />
      </div>
    </div>
  );
};

export default OrdersPage;
