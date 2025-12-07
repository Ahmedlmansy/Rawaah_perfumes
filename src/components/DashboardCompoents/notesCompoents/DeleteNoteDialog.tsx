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
import { Notes } from "@/store/features/notesSlice";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note?: Notes | null;
};
export default function DeleteNoteDialog({
  open,
  onOpenChange,
  note,
}: DialogProps) {
  const [loading, setLoading] = useState(false);

  if (!note) return null;

  const handleDelete = async () => {
    if (!note.id) return;

    setLoading(true);

    const { error } = await supabase.from("notes").delete().eq("id", note.id);

    setLoading(false);

    if (error) {
      console.error("Delete Error:", error.message);
      alert("Failed to delete brand");
      return;
    }

    alert("Nots deleted successfully ");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {note?.name}? This may affect
            products using this note.
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
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
