import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { UserProfile } from "@/store/features/userSlice";
interface EditDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  user: UserProfile | null;
}
export default function EditUserDialog({
  open,
  onOpenChange,
  user,
}: EditDialogProps) {
  return (
    <Dialog open={} onOpenChange={setShowEditDialog}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update user information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name *</Label>
            <Input
              id="edit-name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email *</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value: UserRole) =>
                setFormData({ ...formData, role: value })
              }
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
          <Button variant="outline" onClick={() => setShowEditDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleEditUser}
            disabled={!formData.full_name || !formData.email}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
