"use client";
import React, { useState } from "react";
import { Tags, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import BrandStatsSection from "@/components/DashboardCompoents/brandsCompoents/TopCards";
import AddBrandDialog from "@/components/DashboardCompoents/brandsCompoents/AddBrandDialog";
import BrandsList from "@/components/DashboardCompoents/brandsCompoents/BrandsList";

const BrandsPage = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Tags className="w-8 h-8 text-[#A78B64]" />
              Brands Management
            </h1>
            <p className="text-gray-500 mt-1">Manage your perfume brands</p>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </div>

        <BrandStatsSection />
      </div>
      <BrandsList />
      {/* Add Brand Dialog */}
      <AddBrandDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
};

export default BrandsPage;
