// React Component - بدون SQL Functions
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Tags, Package, AlertCircle } from "lucide-react";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalBrands: number;
  activeBrands: number;
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalBrands: 0,
    activeBrands: 0,
    totalProducts: 0,
    activeProducts: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("status, total");

      if (ordersError) throw ordersError;

      //   Brands
      const { data: brands, error: brandsError } = await supabase
        .from("brands")
        .select("name");

      if (brandsError) throw brandsError;

      //   Products
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("stock");

      if (productsError) throw productsError;

      // حساب الإحصائيات
      const totalOrders = orders?.length || 0;
      const pendingOrders =
        orders?.filter((o) => o.status === "pending").length || 0;
      const completedOrders =
        orders?.filter((o) => o.status === "completed").length || 0;
      const totalRevenue =
        orders
          ?.filter((o) => o.status === "completed")
          .reduce((sum, o) => sum + (o.total || 0), 0) || 0;

      const totalBrands = brands?.length || 0;
      const activeBrands =
        brands?.filter((b) => b.name === "active").length || 0;

      const totalProducts = products?.length || 0;
      const activeProducts =
        products?.filter((p) => p.stock === "active").length || 0;
      const outOfStock =
        products?.filter((p) => !p.stock || p.stock === 0).length || 0;

      setStats({
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        totalBrands,
        activeBrands,
        totalProducts,
        activeProducts,
        outOfStock,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-[#A78B64]/20">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Brands & Products Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Inventory Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-[#A78B64]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Brands</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalBrands}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {stats.activeBrands} active
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-[#A78B64] to-[#8B7355] rounded-lg">
                  <Tags className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.totalProducts}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {stats.activeProducts} active
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#A78B64]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stats.outOfStock}
                  </p>
                  <p className="text-xs text-red-600 mt-1">Needs attention</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
