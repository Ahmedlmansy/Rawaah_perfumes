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
import { fetchNotes } from "@/store/features/notesSlice";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddNoteDialog({ open, onOpenChange }: DialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const handleAddNote = async () => {
    const formattedData = {
      name: formData.name,
      image: formData.image,
    };
    const { error } = await supabase.from("notes").insert([formattedData]);

    if (error) {
      console.error(error);
      alert("Error adding product");
      return;
    }

    alert("Note added successfully ");
    onOpenChange(false);
    dispatch(fetchNotes());
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
          <DialogDescription>Create a new fragrance note</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Note Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Jasmine"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.png"
            />
            <p className="text-xs text-gray-500">
              Leave empty to auto-generate
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => ""}>
            Cancel
          </Button>
          <Button
            onClick={handleAddNote}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
          >
            <Save className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
