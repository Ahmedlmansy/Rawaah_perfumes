"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShopFiltersDrawerProps {
  price: [number, number];
  setPrice: (val: [number, number]) => void;
  sortOption: "alpha" | "alphaDesc" | "priceAsc" | "priceDesc";
  setSortOption: (
    val: "alpha" | "alphaDesc" | "priceAsc" | "priceDesc"
  ) => void;
  selectedBrands: string[];
  setSelectedBrands: (val: string[]) => void;
  selectedSeason: string[];
  setSelectedSeason: (val: string[]) => void;
  selectedType: string[];
  setSelectedType: (val: string[]) => void;
}

export default function ShopFiltersDrawer({
  sortOption,
  setSortOption,
  selectedBrands,
  setSelectedBrands,
  selectedSeason,
  setSelectedSeason,
  selectedType,
  setSelectedType,
}: ShopFiltersDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const brands = [
    { name: "Jean Paul", count: 5 },
    { name: "Armani", count: 3 },
    { name: "Dior", count: 2 },
  ];

  const sortOptions: {
    label: string;
    value: "alpha" | "alphaDesc" | "priceAsc" | "priceDesc";
  }[] = [
    { label: "Name A-Z", value: "alpha" },
    { label: "Name Z-A", value: "alphaDesc" },
    { label: "Price Low to High", value: "priceAsc" },
    { label: "Price High to Low", value: "priceDesc" },
  ];

  const toggleArrayItem = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Filters</Button>
      </DialogTrigger>

      <DialogContent className="fixed bottom-0 left-0 right-0 rounded-t-xl p-6 bg-white shadow-lg sm:max-w-lg sm:mx-auto animate-slide-up z-50 h-full overflow-x-scroll">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Range */}
          {/* <div>
            <h4 className="font-semibold mb-2">Price Range</h4>
            <Slider
              value={price}
              onValueChange={setPrice}
              min={0}
              max={500}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>${price[0]}</span>
              <span>${price[1]}</span>
            </div>
          </div> */}

          {/* Sort Options */}
          <div>
            <h4 className="font-semibold mb-2">Sort By</h4>
            <div className="flex flex-col gap-2">
              {sortOptions.map((opt) => (
                <Button
                  key={opt.value}
                  variant={sortOption === opt.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortOption(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold mb-2">Brands</h4>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Button
                  key={brand.name}
                  variant={
                    selectedBrands.includes(brand.name) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedBrands(
                      toggleArrayItem(selectedBrands, brand.name)
                    )
                  }
                >
                  {brand.name} ({brand.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Season */}
          <div>
            <h4 className="font-semibold mb-2">Season</h4>
            <div className="flex gap-2">
              {["winter", "summer"].map((season) => (
                <Button
                  key={season}
                  variant={
                    selectedSeason.includes(season) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedSeason(toggleArrayItem(selectedSeason, season))
                  }
                >
                  {season}
                </Button>
              ))}
            </div>
          </div>

          {/* Type / Usage */}
          <div>
            <h4 className="font-semibold mb-2">Usage</h4>
            <div className="flex gap-2">
              {["Men", "Women", "Unisex"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSelectedType(toggleArrayItem(selectedType, type))
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <DialogClose asChild>
            <Button className="w-full mt-4">Apply Filters</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
