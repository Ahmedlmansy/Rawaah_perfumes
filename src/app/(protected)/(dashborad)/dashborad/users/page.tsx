"use client";
import React, { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import TopCards from "@/components/DashboardCompoents/usersCompoents/TopCards";
import UsersList from "@/components/DashboardCompoents/usersCompoents/UsersList";
import AddUserDialog from "@/components/DashboardCompoents/usersCompoents/AddUserDialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchAllUsers } from "@/store/apis/userApi";

const UsersPage = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-8 h-8 text-[#A78B64]" />
              Users Management
            </h1>
            <p className="text-gray-500 mt-1">Manage users and permissions</p>
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64] shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      <TopCards />

      <UsersList />
      {/* Add User Dialog */}
      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => dispatch(fetchAllUsers())}
      />
      {/* Edit User Dialog */}

      {/* Delete Confirmation Dialog */}
    </div>
  );
};

export default UsersPage;
