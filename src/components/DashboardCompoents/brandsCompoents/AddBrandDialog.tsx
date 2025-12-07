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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/client";
import { AppDispatch } from "@/store";
import { fetchBrands } from "@/store/features/brandSlice";

import { Save } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
type AddProductsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function AddBrandDialog({
  open,
  onOpenChange,
}: AddProductsDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brand_type: "",
  });
  const handleAddProduct = async () => {
    const formattedData = {
      name: formData.name,
      image: formData.image,
      brand_type: formData.brand_type,
    };

    const { error } = await supabase.from("brands").insert([formattedData]);

    if (error) {
      console.error(error);
      alert("Error adding product");
      return;
    }

    alert("Product added successfully ");
    onOpenChange(false);
    dispatch(fetchBrands());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription>Create a new perfume brand</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Rawaah Perfumes"
            />
          </div>
          <div className="space-y-2">
            <Label>Brand Type</Label>
            <Select
              value={formData.brand_type}
              onValueChange={(e) => setFormData({ ...formData, brand_type: e })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arabic">Arabic</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (optional)</Label>
            <Input
              id="logo"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/logo.png"
            />
            <p className="text-xs text-gray-500">
              Leave empty to auto-generate from brand name
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddProduct}
            disabled={false}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
