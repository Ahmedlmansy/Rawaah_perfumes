import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/products";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
type AddProductsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
};
export default function DeleteProducts({
  open,
  onOpenChange,
  product,
}: AddProductsDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!product?.id) return;

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    setLoading(false);

    if (error) {
      console.error("Delete Error:", error.message);
      alert("Failed to delete product");
      return;
    }

    alert("Product deleted successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {product?.name} ? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onOpenChange(false);
              handleDelete();
            }}
            disabled={loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
