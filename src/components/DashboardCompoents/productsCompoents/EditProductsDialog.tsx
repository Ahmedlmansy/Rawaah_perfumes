"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/products";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
type EditProductsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};
export default function EditProductsDialog({
  open,
  onOpenChange,
  product,
}: EditProductsDialogProps) {
  const [formData, setFormData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleSave = async () => {
    if (!formData) return;
    setLoading(true);

    const { error } = await supabase
      .from("products")
      .update({
        name: formData.name,
        brand: formData.brand,
        price: formData.price,
        discount_price: formData.discount_price,
        size: formData.size,
        stock: formData.stock,
        season: formData.season,
        description: formData.description,
        notes: formData.notes,
      })
      .eq("id", formData.id);

    setLoading(false);

    if (error) {
      console.error("Update error:", error);
      return;
    }

    onOpenChange(false);
    dispatch(fetchProducts());
  };

  if (!formData) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product information</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label>Product Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Brand</Label>
            <Input
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: +e.target.value })
              }
            />
          </div>

          <div>
            <Label>Discount</Label>
            <Input
              type="number"
              value={formData.discount_price || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  discount_price: +e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Size</Label>
            <Input
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Stock</Label>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: +e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <Label>Season</Label>
            <Select
              value={formData.season}
              onValueChange={(val) => setFormData({ ...formData, season: val })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="col-span-2">
            <Label>Notes</Label>
            <Input
              value={formData.notes.join(",")}
              onChange={(e) =>
                setFormData({ ...formData, notes: Array(e.target.value) })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
