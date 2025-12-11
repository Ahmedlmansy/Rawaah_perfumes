import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/store";
import { fetchOrdersApi } from "@/store/apis/ordersApi";
import { fetchAllUsers } from "@/store/apis/userApi";
import { fetchProducts } from "@/store/features/allProductsSlice";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopCards() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products } = useSelector((stats: RootState) => stats.products);
  const { items: orders } = useSelector((stats: RootState) => stats.orders);
  const { users } = useSelector((stats: RootState) => stats.user);
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  // Stats Data
  const stats = [
    {
      title: "Total Revenue",
      value: `$ ${totalRevenue}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "from-[#A78B64] to-[#8B7355]",
    },
    {
      title: "Orders",
      value: orders.length,
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Products",
      value: products.length,
      change: "+5.2%",
      trend: "up",
      icon: Package,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Customers",
      value: users.length,
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ];
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchProducts());
    dispatch(fetchOrdersApi());
  }, [dispatch]);
  return (
    <div>
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
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
