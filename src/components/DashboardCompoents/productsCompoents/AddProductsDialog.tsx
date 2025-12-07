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
import { supabase } from "@/lib/supabase/client";
import { AppDispatch } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import { Label } from "@radix-ui/react-label";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
type AddProductsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function AddProductsDialog({
  open,
  onOpenChange,
}: AddProductsDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    image: "",
    type: "",
    price: "",
    discount_price: "",
    size: "",
    stock: "",
    season: "",
    description: "",
    notes: "",
  });
  const handleAddProduct = async () => {
    const formattedData = {
      name: formData.name,
      brand: formData.brand,
      image: formData.image,
      type: formData.type,
      price: Number(formData.price),
      discount_price: formData.discount_price
        ? Number(formData.discount_price)
        : null,
      size: formData.size,
      stock: Number(formData.stock),
      season: formData.season,
      description: formData.description,
      notes: formData.notes.split(",").map((n) => n.trim()),
    };

    const { error } = await supabase.from("products").insert([formattedData]);

    if (error) {
      console.error(error);
      alert("Error adding product");
      return;
    }

    alert("Product added successfully ");
    onOpenChange(false);
    dispatch(fetchProducts());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a new perfume product</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="His Confession"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand *</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              placeholder="Rawaah Perfumes"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Image *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="150"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount_price">Discount Price</Label>
            <Input
              id="discount_price"
              type="number"
              value={formData.discount_price}
              onChange={(e) =>
                setFormData({ ...formData, discount_price: e.target.value })
              }
              placeholder="120"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size *</Label>
            <Input
              id="size"
              type="number"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              placeholder="50ml"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              placeholder="20"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="season">Season *</Label>
            <Select
              value={formData.season}
              onValueChange={(value) =>
                setFormData({ ...formData, season: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
                <SelectItem value="All Season">All Season</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="season">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Men">Men</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="Unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="A luxurious fragrance..."
              rows={3}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="notes">Notes (comma separated) *</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Jasmine, Bergamot, Sandalwood, Amber"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAddProduct();
              fetchProducts();
            }}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
