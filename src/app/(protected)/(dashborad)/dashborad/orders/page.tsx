"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
  Check,
  X,
  Clock,
  Truck,
  Package,
  Download,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

type Order = {
  id: string;
  order_number: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: OrderStatus;
  payment_method: string;
  shipping_address: string;
  created_at: string;
};

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Mock Orders Data
  const [orders, setOrders] = React.useState<Order[]>([
    {
      id: "1",
      order_number: "ORD-2024-001",
      customer: {
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        phone: "+20 123 456 7890",
      },
      items: [
        { name: "His Confession", quantity: 2, price: 120 },
        { name: "Midnight Rose", quantity: 1, price: 180 },
      ],
      total: 420,
      status: "delivered",
      payment_method: "Credit Card",
      shipping_address: "123 Main St, Cairo, Egypt",
      created_at: "2024-01-15T10:30:00",
    },
    {
      id: "2",
      order_number: "ORD-2024-002",
      customer: {
        name: "Sara Ali",
        email: "sara@example.com",
        phone: "+20 111 222 3333",
      },
      items: [{ name: "Royal Oud", quantity: 1, price: 200 }],
      total: 200,
      status: "shipped",
      payment_method: "Cash on Delivery",
      shipping_address: "456 Elm St, Alexandria, Egypt",
      created_at: "2024-01-20T14:15:00",
    },
    {
      id: "3",
      order_number: "ORD-2024-003",
      customer: {
        name: "Omar Hassan",
        email: "omar@example.com",
        phone: "+20 100 999 8888",
      },
      items: [{ name: "Jasmine Dreams", quantity: 3, price: 150 }],
      total: 450,
      status: "processing",
      payment_method: "Credit Card",
      shipping_address: "789 Oak Ave, Giza, Egypt",
      created_at: "2024-01-22T09:45:00",
    },
    {
      id: "4",
      order_number: "ORD-2024-004",
      customer: {
        name: "Layla Ibrahim",
        email: "layla@example.com",
        phone: "+20 122 333 4444",
      },
      items: [
        { name: "Amber Night", quantity: 1, price: 145 },
        { name: "His Confession", quantity: 1, price: 120 },
      ],
      total: 265,
      status: "pending",
      payment_method: "Cash on Delivery",
      shipping_address: "321 Pine Rd, Mansoura, Egypt",
      created_at: "2024-01-25T16:20:00",
    },
    {
      id: "5",
      order_number: "ORD-2024-005",
      customer: {
        name: "Karim Adel",
        email: "karim@example.com",
        phone: "+20 155 666 7777",
      },
      items: [{ name: "Midnight Rose", quantity: 2, price: 180 }],
      total: 360,
      status: "cancelled",
      payment_method: "Credit Card",
      shipping_address: "555 Cedar Ln, Tanta, Egypt",
      created_at: "2024-01-18T11:30:00",
    },
  ]);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeTab === "all" || order.status === activeTab;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    totalRevenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return Clock;
      case "processing":
        return Package;
      case "shipped":
        return Truck;
      case "delivered":
        return Check;
      case "cancelled":
        return X;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsDialog(true);
  };

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
                  {stats.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-yellow-700 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {stats.pending}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-blue-700 mb-1">Processing</p>
                <p className="text-2xl font-bold text-blue-700">
                  {stats.processing}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-purple-700 mb-1">Shipped</p>
                <p className="text-2xl font-bold text-purple-700">
                  {stats.shipped}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-green-700 mb-1">Delivered</p>
                <p className="text-2xl font-bold text-green-700">
                  {stats.delivered}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-red-700 mb-1">Cancelled</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.cancelled}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-[#A78B64] mb-1">Revenue</p>
                <p className="text-xl font-bold text-[#A78B64]">
                  ${stats.totalRevenue}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-[#A78B64]/20">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by order number or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Card className="border-[#A78B64]/20">
          <CardHeader>
            <CardTitle>Orders List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12 border-2 border-[#A78B64]/30">
                            <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                              {order.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900">
                                {order.order_number}
                              </h3>
                              <Badge
                                variant="outline"
                                className={getStatusColor(order.status)}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                              {order.customer.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.customer.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#A78B64]">
                              ${order.total}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.created_at).toLocaleDateString()}
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
                                onClick={() => openOrderDetails(order)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {order.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "processing")
                                  }
                                >
                                  <Package className="w-4 h-4 mr-2" />
                                  Mark as Processing
                                </DropdownMenuItem>
                              )}
                              {order.status === "processing" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "shipped")
                                  }
                                >
                                  <Truck className="w-4 h-4 mr-2" />
                                  Mark as Shipped
                                </DropdownMenuItem>
                              )}
                              {order.status === "shipped" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "delivered")
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
                                      handleStatusChange(order.id, "cancelled")
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
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}{" "}
                            item(s)
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Payment</p>
                          <p className="font-medium text-gray-900">
                            {order.payment_method}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Shipping</p>
                          <p className="font-medium text-gray-900 truncate">
                            {order.shipping_address}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No orders found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Order Details: {selectedOrder?.order_number}
            </DialogTitle>
            <DialogDescription>
              Placed on{" "}
              {selectedOrder &&
                new Date(selectedOrder.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#A78B64] text-white text-xs">
                      {selectedOrder.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">
                      {selectedOrder.customer.phone}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-[#A78B64]">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Payment & Shipping */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">
                      {selectedOrder.payment_method}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                  <Badge
                    className={`${getStatusColor(
                      selectedOrder.status
                    )} text-base py-2 px-4`}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">
                    {selectedOrder.shipping_address}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="bg-[#A78B64]/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-3xl font-bold text-[#A78B64]">
                    ${selectedOrder.total}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
            <Button className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
