import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchNotes, Notes } from "@/store/features/notesSlice";
import EditNoteDialog from "./EditNoteDialog";
import DeleteNoteDialog from "./DeleteNoteDialog";
import Image from "next/image";
import { fetchUser } from "@/store/apis/userApi";

export default function NotesList() {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.notes);
  const { role } = useSelector((state: RootState) => state.user);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Notes | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredBrands = items.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      {/* Notes Grid */}
      <Card className="border-[#A78B64]/20 my-5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search notes by name "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBrands.map((note) => (
          <Card
            key={note.id}
            className="border-[#A78B64]/20 hover:shadow-xl transition-all duration-300 group"
          >
            <CardContent className="p-6">
              {/* Image */}
              <div className="relative mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={note.image}
                    alt={note.name}
                    className="w-20 h-20 object-cover rounded-full"
                    width={20}
                    height={20}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => alert(`View ${note.name}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedNote(note);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>

                    {role === "admin" && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedNote(note);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {note.name}
              </h3>
            </CardContent>
          </Card>
        ))}
        {/* Edit Note Dialog */}
        <EditNoteDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          note={selectedNote}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteNoteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          note={selectedNote}
        />
      </div>
    </div>
  );
}
