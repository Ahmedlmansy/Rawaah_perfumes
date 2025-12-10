import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { UserProfile } from "@/store/features/userSlice";
interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  user: UserProfile | null;
}
export default function UserDetailsDialog({
  open,
  onOpenChange,
  user,
}: DetailsDialogProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "worker":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        {user && (
          <div className="space-y-6 py-4">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-2 border-[#A78B64]">
                <AvatarImage src={user.name || ""} />
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`mt-2 ${getRoleColor(user.role)}`}
                >
                  {user.role}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Contact Information
              </h4>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {user.role === "user" && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Customer Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#A78B64]/10 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-[#A78B64]">
                        {user.total_orders}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-[#A78B64]/10 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-[#A78B64]">
                        ${user.total_spent}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Total Spent</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
