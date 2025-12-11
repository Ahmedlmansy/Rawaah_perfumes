import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  ArrowDownRight,
  FileText,
  ShoppingCart,
  Package,
  Tags,
} from "lucide-react";

import { Button } from "../ui/button";
import TopCards from "./overviewCompoents/TopCards";
import RecentOrders from "./overviewCompoents/RecentOrders";

export default function Overview() {
  // Recent Orders

  // Top Products
  const topProducts = [
    { name: "His Confession", sales: 234, revenue: "$28,080", trend: "up" },
    { name: "Midnight Rose", sales: 189, revenue: "$34,020", trend: "up" },
    { name: "Royal Oud", sales: 156, revenue: "$31,200", trend: "down" },
    { name: "Jasmine Dreams", sales: 142, revenue: "$21,300", trend: "up" },
  ];

  return (
    <div>
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        <TopCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 border-gray-200">
            <RecentOrders />
          </div>

          {/* Top Products */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {product.name}
                        </p>
                        {product.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales
                      </p>
                      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#A78B64] to-[#8B7355] rounded-full"
                          style={{ width: `${(product.sales / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="font-bold text-[#A78B64] ml-4">
                      {product.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New order received",
                    time: "2 minutes ago",
                    color: "bg-green-500",
                  },
                  {
                    action: "Product stock updated",
                    time: "15 minutes ago",
                    color: "bg-blue-500",
                  },
                  {
                    action: "New user registered",
                    time: "1 hour ago",
                    color: "bg-purple-500",
                  },
                  {
                    action: "Order #ORD-123 shipped",
                    time: "3 hours ago",
                    color: "bg-[#A78B64]",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
                  <Package className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
                <Button
                  variant="outline"
                  className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Orders
                </Button>
                <Button
                  variant="outline"
                  className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
                >
                  <Tags className="w-4 h-4 mr-2" />
                  Manage Brands
                </Button>
                <Button
                  variant="outline"
                  className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
