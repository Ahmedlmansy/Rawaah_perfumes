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
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  ShoppingCart,
  Package,
  Users,
  Tags,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Overview() {
  // Stats Data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "from-[#A78B64] to-[#8B7355]",
    },
    {
      title: "Orders",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Products",
      value: "145",
      change: "+5.2%",
      trend: "up",
      icon: Package,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Customers",
      value: "1,234",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Ahmed Mohamed",
      product: "His Confession",
      amount: "$120",
      status: "completed",
    },
    {
      id: "#ORD-002",
      customer: "Sara Ali",
      product: "Midnight Rose",
      amount: "$180",
      status: "processing",
    },
    {
      id: "#ORD-003",
      customer: "Omar Hassan",
      product: "Royal Oud",
      amount: "$200",
      status: "pending",
    },
    {
      id: "#ORD-004",
      customer: "Layla Ibrahim",
      product: "Jasmine Dreams",
      amount: "$150",
      status: "completed",
    },
    {
      id: "#ORD-005",
      customer: "Karim Adel",
      product: "Amber Night",
      amount: "$165",
      status: "shipped",
    },
  ];

  // Top Products
  const topProducts = [
    { name: "His Confession", sales: 234, revenue: "$28,080", trend: "up" },
    { name: "Midnight Rose", sales: 189, revenue: "$34,020", trend: "up" },
    { name: "Royal Oud", sales: 156, revenue: "$31,200", trend: "down" },
    { name: "Jasmine Dreams", sales: 142, revenue: "$21,300", trend: "up" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <main className="flex-1 overflow-y-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#A78B64]/10 text-[#A78B64] font-semibold">
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.customer}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.product}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                        <p className="font-bold text-gray-900 min-w-[60px] text-right">
                          {order.amount}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {index < recentOrders.length - 1 && (
                      <Separator className="mt-4 bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
