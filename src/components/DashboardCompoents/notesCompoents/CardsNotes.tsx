import { Card, CardContent } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/features/allProductsSlice";
import { fetchNotes } from "@/store/features/notesSlice";
import { Droplets, Filter, Grid3x3 } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CardsNotes() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: notes } = useSelector((state: RootState) => state.notes);
  const { items: products } = useSelector((state: RootState) => state.products);

  const mostUsedNote = useMemo(() => {
    const countMap: Record<string, number> = {};

    products.forEach((product) => {
      product.notes.forEach((noteName: string) => {
        countMap[noteName] = (countMap[noteName] || 0) + 1;
      });
    });

    const sorted = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0] : null;
  }, [products]);

  const totalNotesUsage = useMemo(() => {
    return products.reduce((sum, product) => sum + product.notes.length, 0);
  }, [products]);

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Notes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {notes.length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalNotesUsage}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Grid3x3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Filter className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#A78B64]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Most Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mostUsedNote}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
