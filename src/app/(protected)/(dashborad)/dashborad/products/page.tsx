"use client";
import React, { useState } from "react";
import { Package, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import CardsTop from "@/components/DashboardCompoents/productsCompoents/CardsTop";
import AddProductsDialog from "@/components/DashboardCompoents/productsCompoents/AddProductsDialog";
import ProductsList from "@/components/DashboardCompoents/productsCompoents/ProductsList";

const ProductsPage = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-8 h-8 text-[#A78B64]" />
              Products Management
            </h1>
            <p className="text-gray-500 mt-1">Manage your perfume inventory</p>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="">
          <CardsTop />
        </div>

        {/* Filters & Search */}
        <ProductsList />
      </div>

      {/* Add Product Dialog */}
      <AddProductsDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};

export default ProductsPage;
