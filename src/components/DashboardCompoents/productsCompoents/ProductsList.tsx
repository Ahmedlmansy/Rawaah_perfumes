import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import {
  AlertCircle,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Package,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProductsDialog from "./EditProductsDialog";
import DeleteProductsDialog from "./DeleteProductsDialog";
import { Product } from "@/types/products";
import { fetchUser } from "@/store/apis/userApi";

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.products);
  const { role } = useSelector((state: RootState) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeason, setFilterSeason] = useState("all");

  // filtered Products
  const filteredProducts = items.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason =
      filterSeason === "all" || product.season === filterSeason;
    return matchesSearch && matchesSeason;
  });

  // Dialog
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      {/* Filters & Search */}
      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
            <Select value={filterSeason} onValueChange={setFilterSeason}>
              <SelectTrigger className="w-full md:w-48 border-gray-300 focus:border-[#A78B64]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-[#A78B64]/20">
        <CardHeader>
          <CardTitle>Products List</CardTitle>
          <CardDescription>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                {/* 
                    Send product to EditProductsDialog
                    */}

                {/* Image */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-lg p-2 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    {product.Best_Sellers && (
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Best Seller
                      </Badge>
                    )}
                    {product.stock < 15 && (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Low Stock
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-600">
                      Size:{" "}
                      <span className="font-semibold">{product.size}</span>
                    </span>
                    <span className="text-gray-600">
                      Stock:{" "}
                      <span className="font-semibold">{product.stock}</span>
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {product.season}
                    </Badge>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#A78B64]">
                      ${product.discount_price || product.price}
                    </span>
                    {product.discount_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  {product.discount_price && (
                    <p className="text-xs text-green-600 font-medium mt-1">
                      Save ${product.price - product.discount_price}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => alert(`View ${product.name}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedProduct(product);
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
                          setSelectedProduct(product);
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
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No products found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <EditProductsDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        product={selectedProduct}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteProductsDialog
        onOpenChange={setShowDeleteDialog}
        open={showDeleteDialog}
        product={selectedProduct}
      />
    </div>
  );
}
