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
import { supabase } from "@/lib/supabase/client";
import { AppDispatch } from "@/store";
import { fetchNotes, Notes } from "@/store/features/notesSlice";
import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note?: Notes | null;
};

export default function EditNoteDialog({
  open,
  onOpenChange,
  note,
}: DialogProps) {
  const [formData, setFormData] = useState<Notes | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (note) setFormData(note);
  }, [note]);

  const handleSave = async () => {
    if (!formData) return;
    setLoading(true);

    const { error } = await supabase
      .from("notes")
      .update({
        name: formData.name,
        image: formData.image,
      })
      .eq("id", formData.id);

    setLoading(false);

    if (error) {
      console.error("Update error:", error);
      return;
    }

    onOpenChange(false);
    dispatch(fetchNotes());
  };

  if (!open || !formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>Update note information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Note Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-image">Image URL (optional)</Label>
            <Input
              id="edit-image"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
