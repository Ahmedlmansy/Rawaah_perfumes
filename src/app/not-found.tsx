"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  ArrowLeft,
  Droplets,
  Package,
  ShoppingCart,
  Compass,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NotFoundPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const quickLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingCart, label: "Shop", href: "/products" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: Droplets, label: "Brands", href: "/brands" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          {/* 404 Visual */}
          <div className="relative mb-8">
            {/* Large 404 */}
            <div className="text-[200px] md:text-[280px] font-black leading-none">
              <span className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] bg-clip-text text-transparent opacity-20">
                404
              </span>
            </div>

            {/* Floating Perfume Bottle Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#A78B64]/20">
                  <Droplets className="w-16 h-16 text-[#A78B64]" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The fragrance {"you're"} looking for seems to have evaporated.
              {" Let's"} help you find your way back.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="max-w-2xl mx-auto border-[#A78B64]/20 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for products, brands, or fragrances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                  className="pl-12 pr-4 h-14 text-lg border-[#A78B64]/30 focus:border-[#A78B64]"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
                >
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div className="mb-12">
            <p className="text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Card
                    key={index}
                    className="border-[#A78B64]/20 hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
                    onClick={() => (window.location.href = link.href)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#A78B64]/10 to-[#8B7355]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-[#A78B64] group-hover:to-[#8B7355] transition-all">
                        <Icon className="w-7 h-7 text-[#A78B64] group-hover:text-white transition-colors" />
                      </div>
                      <p className="font-semibold text-gray-900 group-hover:text-[#A78B64] transition-colors">
                        {link.label}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-[#A78B64] text-[#A78B64] hover:bg-[#A78B64]/10 h-12 px-8 text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] h-12 px-8 text-lg shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Fun Error Messages */}
        <Card className="border-[#A78B64]/20 bg-gradient-to-br from-[#A78B64]/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#A78B64]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Compass className="w-6 h-6 text-[#A78B64]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Lost Your Way?
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {" Don't"} worry! Even the best perfumers sometimes lose their
                  way in the world of scents. Here are some things you can try:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#A78B64] rounded-full"></div>
                    Check the URL for typos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#A78B64] rounded-full"></div>
                    Use the search bar above to find what {"you're"} looking for
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#A78B64] rounded-full"></div>
                    Browse our collection from the navigation menu
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#A78B64] rounded-full"></div>
                    Contact our support team if you need assistance
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Code */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-400">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
