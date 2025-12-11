import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppDispatch, RootState } from "@/store";
import { fetchOrdersApi } from "@/store/apis/ordersApi";
import { Eye } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RecentOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((stats: RootState) => stats.orders);
  const getTimestamp = (v?: string) => (v ? new Date(v).getTime() : 0);

  const recentOrders = [...items]
    .sort((a, b) => getTimestamp(b.created_at) - getTimestamp(a.created_at))
    .slice(0, 5);

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
  useEffect(() => {
    dispatch(fetchOrdersApi());
  }, [dispatch]);

  return (
    <Card className="">
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
          {recentOrders.map((order, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#A78B64]/10 text-[#A78B64] font-semibold">
                        {order.frist_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.frist_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items[0].product.name}
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
                      {order.total}
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
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
