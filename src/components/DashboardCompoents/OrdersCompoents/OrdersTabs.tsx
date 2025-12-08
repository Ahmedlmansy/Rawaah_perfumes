import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Eye,
  MoreVertical,
  Package,
  Search,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchOrdersApi, updateOrderStatusApi } from "@/store/apis/ordersApi";
import { Order } from "@/store/features/ordersSlice";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type TabValue = "all" | OrderStatus;

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
}

export default function OrdersTabs() {
  const [showDetailsDialog, setShowDetailsDialog] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.orders);

  const stats: OrderStats = {
    total: items.length,
    pending: items.filter((o) => o.status === "pending").length,
    processing: items.filter((o) => o.status === "processing").length,
    shipped: items.filter((o) => o.status === "shipped").length,
    delivered: items.filter((o) => o.status === "delivered").length,
    cancelled: items.filter((o) => o.status === "cancelled").length,
    totalRevenue: items
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0),
  };

  const filteredOrders: Order[] = items.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.frist_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || order.status === activeTab;

    return matchesSearch && matchesTab;
  });

  useEffect(() => {
    dispatch(fetchOrdersApi());
  }, [dispatch]);

  const handleViewDetails = (order: Order): void => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: OrderStatus
  ): Promise<void> => {
    try {
      await dispatch(
        updateOrderStatusApi({ orderId, status: newStatus })
      ).unwrap();
      dispatch(fetchOrdersApi());
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      processing: "bg-blue-100 text-blue-800 border-blue-300",
      shipped: "bg-purple-100 text-purple-800 border-purple-300",
      delivered: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status];
  };

  const getInitials = (userId: string): string => {
    return userId.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatStatus = (status: OrderStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatPaymentMethod = (method: "card" | "cash"): string => {
    return method === "card" ? "Credit Card" : "Cash on Delivery";
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by order number, customer name, phone, or email..."
              className="pl-10 border-gray-300 focus:border-[#A78B64]"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A78B64]/20">
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabValue)}
          >
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({stats.processing})
              </TabsTrigger>
              <TabsTrigger value="shipped">
                Shipped ({stats.shipped})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({stats.delivered})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled ({stats.cancelled})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A78B64] mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No orders found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                filteredOrders.map((order: Order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border-2 border-[#A78B64]/30">
                          <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                            {getInitials(order.user_id)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900">
                              #{order.id?.substring(0, 8)}
                            </h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(
                                order.status as OrderStatus
                              )}
                            >
                              {formatStatus(order.status as OrderStatus)}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {order.frist_name} {order.last_name}
                          </p>
                          <p className="text-xs text-gray-500">{order.phone}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#A78B64]">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(order)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {order.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id!, "processing")
                                }
                              >
                                <Package className="w-4 h-4 mr-2" />
                                Mark as Processing
                              </DropdownMenuItem>
                            )}
                            {order.status === "processing" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id!, "shipped")
                                }
                              >
                                <Truck className="w-4 h-4 mr-2" />
                                Mark as Shipped
                              </DropdownMenuItem>
                            )}
                            {order.status === "shipped" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleUpdateStatus(order.id!, "delivered")
                                }
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Mark as Delivered
                              </DropdownMenuItem>
                            )}
                            {order.status !== "cancelled" &&
                              order.status !== "delivered" && (
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleUpdateStatus(order.id!, "cancelled")
                                  }
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel Order
                                </DropdownMenuItem>
                              )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <Separator className="mb-3 bg-gray-100" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Items</p>
                        <p className="font-medium text-gray-900">
                          {order.items.length} item(s)
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Payment</p>
                        <p className="font-medium text-gray-900">
                          {formatPaymentMethod(order.payment_method)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Shipping</p>
                        <p
                          className="font-medium text-gray-900 truncate"
                          title={order.address}
                        >
                          {order.address}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <OrderDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        order={selectedOrder}
      />
    </div>
  );
}
