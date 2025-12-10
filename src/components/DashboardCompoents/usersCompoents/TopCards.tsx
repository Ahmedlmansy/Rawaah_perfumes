import { Card, CardContent } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/store";
import { fetchAllUsers } from "@/store/apis/userApi";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopCards() {
  const dispatch = useDispatch<AppDispatch>();

  const { users } = useSelector((state: RootState) => state.user);

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    workers: users.filter((u) => u.role === "worker").length,
    customers: users.filter((u) => u.role === "user").length,
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-[#A78B64]/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-red-700 mb-1">Admins</p>
              <p className="text-2xl font-bold text-red-700">{stats.admins}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-blue-700 mb-1">Workers</p>
              <p className="text-2xl font-bold text-blue-700">
                {stats.workers}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gray-50/50">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-xs text-gray-700 mb-1">Customers</p>
              <p className="text-2xl font-bold text-gray-700">
                {stats.customers}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
