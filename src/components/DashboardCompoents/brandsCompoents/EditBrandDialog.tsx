import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Save } from "lucide-react";
import { Brand, fetchBrands } from "@/store/features/brandSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

type EditBrandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand: Brand | null;
};

export default function EditBrandDialog({
  open,
  onOpenChange,
  brand,
}: EditBrandDialogProps) {
  const [formData, setFormData] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (open && brand) {
      setFormData({
        ...brand,
        name: brand.name || "",
        brand_type: brand.brand_type || "arabic",
        image: brand.image || "",
      });
    } else if (!open) {
      setFormData(null);
    }
  }, [open, brand]);

  const handleSave = async () => {
    if (!formData || !formData.id) {
      console.error("No brand data or ID to update");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("brands")
        .update({
          name: formData.name.trim(),
          brand_type: formData.brand_type,
          image: formData.image,
          updated_at: new Date().toISOString(),
        })
        .eq("id", formData.id);

      if (error) throw error;

      alert("Brand updated successfully");
      onOpenChange(false);
      dispatch(fetchBrands());
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update brand");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData?.name?.trim()) {
      alert("Brand name is required");
      return;
    }
    handleSave();
  };

  if (!open || !formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>Update brand information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Brand Name */}
            <div className="space-y-2">
              <Label htmlFor="edit-name">Brand Name *</Label>
              <Input
                id="edit-name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter brand name"
                required
              />
            </div>

            {/* Brand Type */}
            <div className="space-y-2">
              <Label>Brand Type</Label>
              <Select
                value={formData.brand_type || "arabic"}
                onValueChange={(value) =>
                  setFormData({ ...formData, brand_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arabic">Arabic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label htmlFor="edit-logo">Logo URL (optional)</Label>
              <Input
                id="edit-logo"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
