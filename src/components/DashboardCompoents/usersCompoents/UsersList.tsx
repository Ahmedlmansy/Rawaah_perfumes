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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppDispatch, RootState } from "@/store";
import { fetchAllUsers } from "@/store/apis/userApi";
import {
  Briefcase,
  Calendar,
  Crown,
  Edit,
  Eye,
  LucideIcon,
  Mail,
  MoreVertical,
  Phone,
  Search,
  Trash2,
  UserCircle,
  Users,
  Loader2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsDialog from "./UserDetailsDialog";
import { UserProfile } from "@/store/features/userSlice";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

//  Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserRole = "admin" | "worker" | "user";

export default function UsersList() {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user: UserProfile | null;
  }>({ open: false, user: null });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { users } = useSelector((state: RootState) => state.user);

  // Stats
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    workers: users.filter((u) => u.role === "worker").length,
    customers: users.filter((u) => u.role === "user").length,
  };

  const getRoleIcon = (role: "admin" | "worker" | "user"): LucideIcon => {
    switch (role) {
      case "admin":
        return Crown;
      case "worker":
        return Briefcase;
      case "user":
        return UserCircle;
      default:
        return UserCircle;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeTab === "all" || user.role === activeTab;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "worker":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  //  Change User Role
  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    try {
      setUpdating(userId);

      const { error } = await supabase.rpc("update_user_role", {
        target_user_id: userId,
        new_role: newRole,
      });

      if (error) throw error;

      dispatch(fetchAllUsers());

      toast.success(`User role updated to ${newRole} successfully!`);
    } catch (error) {
      console.error("Error updating role:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("Unauthorized")) {
        toast.error("You need admin privileges to update roles");
      } else {
        toast.error(`Failed to update role: ${errorMessage}`);
      }
    } finally {
      setUpdating(null);
    }
  };

  //  Delete User
  const handleDeleteUser = async () => {
    if (!deleteDialog.user) return;

    try {
      setLoading(true);

      const { error } = await supabase.rpc("delete_user_account", {
        user_id: deleteDialog.user.id,
      });

      if (error) throw error;

      setDeleteDialog({ open: false, user: null });
      dispatch(fetchAllUsers());

      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Delete user error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("Unauthorized")) {
        toast.error("You need admin privileges to delete users");
      } else {
        toast.error(`Failed to delete user: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <Card className="border-[#A78B64]/20 my-4">
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
                const isUpdatingThisUser = updating === user.id;

                return (
                  <div
                    key={user.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-14 h-14 border-2 border-[#A78B64]/30">
                          <AvatarImage
                            src={
                              "https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
                            }
                            alt={user.name || "avatar image"}
                          />
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">
                              {user.name || "No Name"}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`${getRoleColor(
                                user.role
                              )} flex gap-1 items-center`}
                            >
                              {(() => {
                                const Icon = getRoleIcon(user.role);
                                return <Icon size={15} />;
                              })()}
                              <span className="capitalize">{user.role}</span>
                            </Badge>
                            {isUpdatingThisUser && (
                              <span className="text-sm text-blue-600 flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Updating...
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{user.email}</span>
                            </div>
                            {user.name && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{user.name}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Joined{" "}
                                {new Date(user.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {user.role === "user" && (
                            <div className="flex items-center gap-4 mt-3 text-sm">
                              <span className="text-gray-600">
                                Orders:{" "}
                                <span className="font-semibold text-[#A78B64]">
                                  {user.total_orders || 0}
                                </span>
                              </span>
                              <span className="text-gray-600">
                                Spent:{" "}
                                <span className="font-semibold text-[#A78B64]">
                                  ${user.total_spent || 0}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={loading || isUpdatingThisUser}
                          >
                            {loading || isUpdatingThisUser ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <MoreVertical className="w-4 h-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => console.log("Edit user")}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {/* Admin */}
                          {user.role !== "admin" ? (
                            <>
                              {user.role !== "worker" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(user.id, "worker")
                                  }
                                  disabled={isUpdatingThisUser}
                                >
                                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                                  Promote to Worker
                                </DropdownMenuItem>
                              )}
                              {user.role !== "user" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleChangeRole(user.id, "user")
                                  }
                                  disabled={isUpdatingThisUser}
                                >
                                  <UserCircle className="w-4 h-4 mr-2 text-gray-600" />
                                  Demote to Customer
                                </DropdownMenuItem>
                              )}
                            </>
                          ) : (
                            <DropdownMenuItem disabled>
                              <Crown className="w-4 h-4 mr-2 text-red-400" />
                              Admin role cannot be changed
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() =>
                              setDeleteDialog({ open: true, user })
                            }
                            disabled={
                              loading ||
                              isUpdatingThisUser ||
                              user.role === "admin"
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {user.role === "admin"
                              ? "Cannot delete Admin"
                              : "Delete User"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}

              {/* No Users Found */}
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

      {/* Delete User Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          !loading && setDeleteDialog({ open, user: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteDialog.user?.name || deleteDialog.user?.email}
              </span>
              ? This action cannot be undone and will remove all user data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* User Details Dialog */}
      <UserDetailsDialog
        onOpenChange={setShowDetailsDialog}
        open={showDetailsDialog}
        user={selectedUser}
      />
    </div>
  );
}
