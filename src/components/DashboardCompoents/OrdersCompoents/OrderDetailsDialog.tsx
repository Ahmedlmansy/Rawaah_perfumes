import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/store/features/ordersSlice";
import { Download } from "lucide-react";
import React from "react";
import { OrderStatus } from "./OrdersTabs";
type OrderDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
};
export default function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
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

  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Order Details: {order.id}
          </DialogTitle>
          <DialogDescription>
            Placed on
            {order.created_at}
          </DialogDescription>
        </DialogHeader>

        {
          <div className="space-y-6 py-4">
            {/* Customer Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#A78B64] text-white text-xs">
                    {order.frist_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                Customer Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">
                    {order.frist_name}
                    {""}
                    {order.last_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{order.phone}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3"> </h3>
              {order.items.map((i) => {
                return (
                  <div className="space-y-3" key={i.id}>
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {i.product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {i.quantity} | Price: ${i.product.price}
                        </p>
                      </div>
                      <p className="font-bold text-[#A78B64]">
                        total {i.quantity * i.product.price} $
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Payment & Shipping */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Payment Method
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{order.payment_method}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                <Badge
                  className={`${getStatusColor(order.status as OrderStatus)}`}
                >
                  {" "}
                  {order.status}{" "}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Shipping Address
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{order.address}</p>
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
                  $ {order.total}
                </span>
              </div>
            </div>
          </div>
        }

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
