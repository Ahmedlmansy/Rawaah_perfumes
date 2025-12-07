import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Edit, Eye, MoreVertical, Search, Tags, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Brand, fetchBrands } from "@/store/features/brandSlice";
import DeleteBrandDialog from "./DeleteBrandDialog";
import EditBrandDialog from "./EditBrandDialog";
import { fetchUser } from "@/store/apis/userApi";

export default function BrandsList() {
  // redux
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.brands);
  const { role } = useSelector((state: RootState) => state.user);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Filter brands
  const filteredBrands = items.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      {/* Search & View Toggle */}
      <Card className="border-[#A78B64]/20 my-5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search brands by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-[#A78B64] hover:bg-[#8B7355]" : ""
                }
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-[#A78B64] hover:bg-[#8B7355]" : ""
                }
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Card
              key={brand.id}
              className="border-[#A78B64]/20 hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6">
                {/* Logo & Actions */}
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-16 h-16 border-2 border-[#A78B64]/30">
                    <AvatarImage src={brand.image} alt={brand.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                      {brand.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => alert(`View ${brand.name}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedBrand(brand);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setShowDeleteDialog(true);
                          setSelectedBrand(brand);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Brand Info */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {brand.name}
                </h3>

                <Separator className="mb-4 bg-[#A78B64]/10" />
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {brand.brand_type}
                </p>

                {/* Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Created {new Date(brand.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-[#A78B64]/20">
          <CardHeader>
            <CardTitle>Brands List</CardTitle>
            <CardDescription>
              {filteredBrands.length} brand
              {filteredBrands.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Logo */}
                  <Avatar className="w-16 h-16 border-2 border-[#A78B64]/30 flex-shrink-0">
                    <AvatarImage src={brand.image} alt={brand.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                      {brand.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Date & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-gray-400">Created</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(brand.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => alert(`View ${brand.name}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setShowEditDialog(true)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {role === "admin" && (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setShowDeleteDialog(true)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredBrands.length === 0 && (
                <div className="text-center py-12">
                  <Tags className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No brands found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your search
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      <EditBrandDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        brand={selectedBrand}
      />
      <DeleteBrandDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        brand={selectedBrand}
      />
    </div>
  );
}
