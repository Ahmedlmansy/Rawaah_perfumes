"use client";
import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Lock,
  Unlock,
  Save,
  Crown,
  Briefcase,
  UserCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UserRole = "admin" | "worker" | "user";

type User = {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  total_orders?: number;
  total_spent?: number;
  created_at: string;
  last_login?: string;
};

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock Users Data
  const [users, setUsers] = React.useState<User[]>([
    {
      id: "1",
      full_name: "Ahmed Mohamed",
      email: "ahmed@example.com",
      phone: "+20 123 456 7890",
      role: "admin",
      avatar_url:
        "https://ui-avatars.com/api/?name=Ahmed+Mohamed&background=A78B64&color=fff",
      is_active: true,
      total_orders: 0,
      total_spent: 0,
      created_at: "2023-01-10",
      last_login: "2024-01-25T10:30:00",
    },
    {
      id: "2",
      full_name: "Sara Ali",
      email: "sara@example.com",
      phone: "+20 111 222 3333",
      role: "worker",
      avatar_url:
        "https://ui-avatars.com/api/?name=Sara+Ali&background=8B7355&color=fff",
      is_active: true,
      total_orders: 0,
      total_spent: 0,
      created_at: "2023-03-15",
      last_login: "2024-01-24T15:20:00",
    },
    {
      id: "3",
      full_name: "Omar Hassan",
      email: "omar@example.com",
      phone: "+20 100 999 8888",
      role: "user",
      avatar_url:
        "https://ui-avatars.com/api/?name=Omar+Hassan&background=C4A574&color=fff",
      is_active: true,
      total_orders: 15,
      total_spent: 2340,
      created_at: "2023-06-20",
      last_login: "2024-01-22T09:15:00",
    },
    {
      id: "4",
      full_name: "Layla Ibrahim",
      email: "layla@example.com",
      phone: "+20 122 333 4444",
      role: "user",
      avatar_url:
        "https://ui-avatars.com/api/?name=Layla+Ibrahim&background=9D8055&color=fff",
      is_active: true,
      total_orders: 8,
      total_spent: 1260,
      created_at: "2023-08-10",
      last_login: "2024-01-20T14:45:00",
    },
    {
      id: "5",
      full_name: "Karim Adel",
      email: "karim@example.com",
      phone: "+20 155 666 7777",
      role: "user",
      avatar_url:
        "https://ui-avatars.com/api/?name=Karim+Adel&background=B8956A&color=fff",
      is_active: false,
      total_orders: 3,
      total_spent: 450,
      created_at: "2023-10-05",
      last_login: "2023-12-15T11:30:00",
    },
    {
      id: "6",
      full_name: "Nour Fathy",
      email: "nour@example.com",
      phone: "+20 112 777 8888",
      role: "worker",
      avatar_url:
        "https://ui-avatars.com/api/?name=Nour+Fathy&background=D4B896&color=fff",
      is_active: true,
      total_orders: 0,
      total_spent: 0,
      created_at: "2023-11-12",
      last_login: "2024-01-23T16:00:00",
    },
  ]);

  // Form State
  const [formData, setFormData] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    role: "user" as UserRole,
    password: "",
  });

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeTab === "all" || user.role === activeTab;
    return matchesSearch && matchesRole;
  });

  // Stats
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    workers: users.filter((u) => u.role === "worker").length,
    customers: users.filter((u) => u.role === "user").length,
    active: users.filter((u) => u.is_active).length,
    inactive: users.filter((u) => !u.is_active).length,
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return Crown;
      case "worker":
        return Briefcase;
      case "user":
        return UserCircle;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "worker":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.full_name
      )}&background=A78B64&color=fff`,
      is_active: true,
      total_orders: 0,
      total_spent: 0,
      created_at: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setShowAddDialog(false);
    resetForm();
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              full_name: formData.full_name,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
            }
          : u
      )
    );
    setShowEditDialog(false);
    setSelectedUser(null);
    resetForm();
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      password: "",
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const openDetailsDialog = (user: User) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      role: "user",
      password: "",
    });
  };

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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="border-[#A78B64]/20">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-red-700 mb-1">Admins</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.admins}
                </p>
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

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-green-700 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-700">
                  {stats.active}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-orange-700 mb-1">Inactive</p>
                <p className="text-2xl font-bold text-orange-700">
                  {stats.inactive}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-[#A78B64]/20">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Tabs */}
        <Card className="border-[#A78B64]/20">
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="admin">Admins ({stats.admins})</TabsTrigger>
                <TabsTrigger value="worker">
                  Workers ({stats.workers})
                </TabsTrigger>
                <TabsTrigger value="user">
                  Customers ({stats.customers})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <div
                      key={user.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14 border-2 border-[#A78B64]/30">
                            <AvatarImage
                              src={user.avatar_url}
                              alt={user.full_name}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                              {user.full_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {user.full_name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={getRoleColor(user.role)}
                              >
                                <RoleIcon className="w-3 h-3 mr-1" />
                                {user.role}
                              </Badge>
                              {user.is_active ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                  Active
                                </Badge>
                              ) : (
                                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                  Inactive
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                              </div>
                              {user.phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Phone className="w-4 h-4" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Joined{" "}
                                  {new Date(
                                    user.created_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {user.role === "user" && (
                              <div className="flex items-center gap-4 mt-3 text-sm">
                                <span className="text-gray-600">
                                  Orders:{" "}
                                  <span className="font-semibold text-[#A78B64]">
                                    {user.total_orders}
                                  </span>
                                </span>
                                <span className="text-gray-600">
                                  Spent:{" "}
                                  <span className="font-semibold text-[#A78B64]">
                                    ${user.total_spent}
                                  </span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem
                              onClick={() => openDetailsDialog(user)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openEditDialog(user)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.is_active ? (
                                <>
                                  <Lock className="w-4 h-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Unlock className="w-4 h-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {user.role !== "admin" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeRole(user.id, "admin")
                                }
                              >
                                <Crown className="w-4 h-4 mr-2" />
                                Promote to Admin
                              </DropdownMenuItem>
                            )}
                            {user.role !== "worker" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeRole(user.id, "worker")
                                }
                              >
                                <Briefcase className="w-4 h-4 mr-2" />
                                {user.role === "admin"
                                  ? "Demote to Worker"
                                  : "Promote to Worker"}
                              </DropdownMenuItem>
                            )}
                            {user.role !== "user" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeRole(user.id, "user")
                                }
                              >
                                <UserCircle className="w-4 h-4 mr-2" />
                                Change to Customer
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => openDeleteDialog(user)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No users found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="Ahmed Mohamed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="ahmed@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+20 123 456 7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Customer</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={
                !formData.full_name || !formData.email || !formData.password
              }
              className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
            >
              <Save className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name *</Label>
              <Input
                id="edit-name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Customer</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={!formData.full_name || !formData.email}
              className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.full_name}? This
              action cannot be undone and will remove all user data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* User Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-[#A78B64]">
                  <AvatarImage
                    src={selectedUser.avatar_url}
                    alt={selectedUser.full_name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white text-xl font-bold">
                    {selectedUser.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedUser.full_name}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`mt-2 ${getRoleColor(selectedUser.role)}`}
                  >
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Contact Information
                </h4>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                  </div>
                  {selectedUser.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">{selectedUser.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Account Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Account Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    {selectedUser.is_active ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Joined</p>
                    <p className="font-medium">
                      {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedUser.last_login && (
                    <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Last Login</p>
                      <p className="font-medium">
                        {new Date(selectedUser.last_login).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {selectedUser.role === "user" && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Customer Statistics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#A78B64]/10 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-[#A78B64]">
                          {selectedUser.total_orders}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Total Orders
                        </p>
                      </div>
                      <div className="bg-[#A78B64]/10 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-[#A78B64]">
                          ${selectedUser.total_spent}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Total Spent
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
