"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Save } from "lucide-react";

//  Types
type UserRole = "admin" | "worker" | "user";

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

interface ApiErrorResponse {
  error: string;
  details?: string;
}

interface ApiSuccessResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
  };
}

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onSuccess?: () => void;
}

export default function AddUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddUserDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "user",
    });
    setError(null);
  };

  const handleAddUser = async () => {
    if (!formData.full_name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorData = data as ApiErrorResponse;
        throw new Error(
          errorData.details || errorData.error || "Failed to create user"
        );
      }

      const successData = data as ApiSuccessResponse;
      console.log("User created:", successData.user);

      resetForm();

      onOpenChange(false);

      if (onSuccess) {
        onSuccess();
      }

      alert(" User created successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      setError(errorMessage);
      console.error("Failed to create user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account</DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Ahmed Mohamed"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="ahmed@example.com"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+20 123 456 7890"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) =>
                setFormData({ ...formData, role: value })
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Customer</SelectItem>
                <SelectItem value="worker">Worker</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            disabled={
              loading ||
              !formData.full_name ||
              !formData.email ||
              !formData.password
            }
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Creating..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
