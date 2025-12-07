import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Brand } from "@/store/features/brandSlice";
import { supabase } from "@/lib/supabase/client";

type DeleteBrandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brand?: Brand | null;
};

export default function DeleteBrandDialog({
  open,
  onOpenChange,
  brand,
}: DeleteBrandDialogProps) {
  const [loading, setLoading] = useState(false);

  if (!brand) return null;

  const handleDelete = async () => {
    if (!brand.id) return;
    setLoading(true);

    const { error } = await supabase.from("brands").delete().eq("id", brand.id);

    setLoading(false);

    if (error) {
      console.error("Delete Error:", error.message);
      alert("Failed to delete brand");
      return;
    }

    alert("Brand deleted successfully ");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Brand</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <b>{brand.name}</b>? This will also
            affect all products under this brand.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
