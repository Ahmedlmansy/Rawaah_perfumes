"use client";
import React, { useEffect, useState } from "react";
import {
  Mail,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Star,
  StarOff,
  Reply,
  Archive,
  AlertCircle,
  Phone,
  Calendar,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type MessageStatus = "unread" | "read" | "replied" | "archived";
type MessagePriority = "low" | "normal" | "high";

type Message = {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  status?: MessageStatus;
  priority?: MessagePriority;
  is_starred?: boolean;
  created_at: string;
  replied_at?: string;
  reply_message?: string;
};

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  //  Fetch Messages from Supabase
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load messages";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "starred" && message.is_starred) ||
      (activeTab !== "starred" && message.status === activeTab);
    return matchesSearch && matchesTab;
  });

  // Stats
  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "unread").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
    starred: messages.filter((m) => m.is_starred).length,
    highPriority: messages.filter(
      (m) => m.priority === "high" && m.status === "unread"
    ).length,
  };

  const getStatusColor = (status?: MessageStatus) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "read":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "replied":
        return "bg-green-100 text-green-700 border-green-200";
      case "archived":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority?: MessagePriority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "normal":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  //  Mark as Read
  const handleMarkAsRead = async (messageId: string) => {
    try {
      setUpdating(messageId);

      const { error } = await supabase
        .from("messages")
        .update({ status: "read" })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(
        messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, status: "read" as MessageStatus }
            : msg
        )
      );

      toast.success("Message marked as read");
    } catch (error) {
      console.error("Error marking as read:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update status";
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  //  Toggle Star
  const handleToggleStar = async (messageId: string) => {
    try {
      const message = messages.find((m) => m.id === messageId);
      if (!message) return;

      const newStarredState = !message.is_starred;

      const { error } = await supabase
        .from("messages")
        .update({ is_starred: newStarredState })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, is_starred: newStarredState } : msg
        )
      );

      toast.success(newStarredState ? "Message starred" : "Message unstarred");
    } catch (error) {
      console.error("Error toggling star:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update star";
      toast.error(errorMessage);
    }
  };

  //  Archive Message
  const handleArchive = async (messageId: string) => {
    try {
      setUpdating(messageId);

      const { error } = await supabase
        .from("messages")
        .update({ status: "archived" })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(
        messages.map((msg) =>
          msg.id === messageId
            ? { ...msg, status: "archived" as MessageStatus }
            : msg
        )
      );

      toast.success("Message archived");
    } catch (error) {
      console.error("Error archiving:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to archive";
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  //  Delete Message
  const handleDelete = async () => {
    if (!selectedMessage) return;

    try {
      setUpdating(selectedMessage.id);

      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", selectedMessage.id);

      if (error) throw error;

      setMessages(messages.filter((msg) => msg.id !== selectedMessage.id));
      setShowDeleteDialog(false);
      setSelectedMessage(null);

      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete message";
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  //  Send Reply
  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      setUpdating(selectedMessage.id);

      const { error } = await supabase
        .from("messages")
        .update({
          status: "replied",
          replied_at: new Date().toISOString(),
          reply_message: replyText,
        })
        .eq("id", selectedMessage.id);

      if (error) throw error;

      setMessages(
        messages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                status: "replied" as MessageStatus,
                replied_at: new Date().toISOString(),
                reply_message: replyText,
              }
            : msg
        )
      );

      setShowReplyDialog(false);
      setShowDetailsDialog(false);
      setReplyText("");
      setSelectedMessage(null);

      toast.success("Reply sent successfully");
    } catch (error) {
      console.error("Error sending reply:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send reply";
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  const openDetailsDialog = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      handleMarkAsRead(message.id);
    }
    setShowDetailsDialog(true);
  };

  const openReplyDialog = (message: Message) => {
    setSelectedMessage(message);
    setReplyText("");
    setShowReplyDialog(true);
  };

  const openDeleteDialog = (message: Message) => {
    setSelectedMessage(message);
    setShowDeleteDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#A78B64] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-8 h-8 text-[#A78B64]" />
              Messages & Contact
            </h1>
            <p className="text-gray-500 mt-1">
              Customer inquiries and contact form submissions
            </p>
          </div>
          {stats.highPriority > 0 && (
            <Badge className="bg-red-100 text-red-700 border-red-200 text-base px-4 py-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              {stats.highPriority} High Priority
            </Badge>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-[#A78B64]/20">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-blue-700 mb-1">Unread</p>
                <p className="text-2xl font-bold text-blue-700">
                  {stats.unread}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-gray-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-gray-700 mb-1">Read</p>
                <p className="text-2xl font-bold text-gray-700">{stats.read}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-green-700 mb-1">Replied</p>
                <p className="text-2xl font-bold text-green-700">
                  {stats.replied}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-purple-700 mb-1">Archived</p>
                <p className="text-2xl font-bold text-purple-700">
                  {stats.archived}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-yellow-700 mb-1">Starred</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {stats.starred}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-xs text-red-700 mb-1">Priority</p>
                <p className="text-2xl font-bold text-red-700">
                  {stats.highPriority}
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
                placeholder="Search by name, email, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[#A78B64]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Messages Tabs */}
        <Card className="border-[#A78B64]/20">
          <CardHeader>
            <CardTitle>Messages List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({stats.unread})
                </TabsTrigger>
                <TabsTrigger value="read">Read ({stats.read})</TabsTrigger>
                <TabsTrigger value="replied">
                  Replied ({stats.replied})
                </TabsTrigger>
                <TabsTrigger value="starred">
                  Starred ({stats.starred})
                </TabsTrigger>
                <TabsTrigger value="archived">
                  Archived ({stats.archived})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredMessages.map((message) => {
                  const isUpdatingThis = updating === message.id;

                  return (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                        message.status === "unread"
                          ? "border-blue-300 bg-blue-50/30"
                          : "border-gray-200"
                      }`}
                      onClick={() => openDetailsDialog(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12 border-2 border-[#A78B64]/30 flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white font-bold">
                              {message.full_name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "?"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3
                                className={`font-bold text-gray-900 ${
                                  message.status === "unread"
                                    ? "text-blue-900"
                                    : ""
                                }`}
                              >
                                {message.full_name || "Unknown"}
                              </h3>
                              <Badge
                                variant="outline"
                                className={getStatusColor(message.status)}
                              >
                                {message.status || "unread"}
                              </Badge>
                              {message.priority === "high" && (
                                <Badge
                                  variant="outline"
                                  className={getPriorityColor(message.priority)}
                                >
                                  High Priority
                                </Badge>
                              )}
                              {message.is_starred && (
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              )}
                              {isUpdatingThis && (
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                              )}
                            </div>

                            <p
                              className={`text-sm mb-2 ${
                                message.status === "unread"
                                  ? "font-semibold text-gray-900"
                                  : "text-gray-600"
                              }`}
                            >
                              {message.subject || "No Subject"}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-2">
                              {message.message}
                            </p>

                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {message.email}
                              </span>
                              {message.phone_number && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {message.phone_number}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(message.created_at).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStar(message.id);
                            }}
                            disabled={isUpdatingThis}
                          >
                            {message.is_starred ? (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            ) : (
                              <StarOff className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isUpdatingThis}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDetailsDialog(message);
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {message.status !== "replied" && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openReplyDialog(message);
                                  }}
                                >
                                  <Reply className="w-4 h-4 mr-2" />
                                  Reply
                                </DropdownMenuItem>
                              )}
                              {message.status === "unread" && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsRead(message.id);
                                  }}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Read
                                </DropdownMenuItem>
                              )}
                              {message.status !== "archived" && (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleArchive(message.id);
                                  }}
                                >
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeleteDialog(message);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      No messages found
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Message Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#A78B64]" />
              Message Details
            </DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-6 py-4">
              {/* Sender Info */}
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-[#A78B64]">
                  <AvatarFallback className="bg-gradient-to-br from-[#A78B64] to-[#8B7355] text-white text-xl font-bold">
                    {selectedMessage.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedMessage.full_name || "Unknown"}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedMessage.email}
                    </span>
                    {selectedMessage.phone_number && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {selectedMessage.phone_number}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge
                      variant="outline"
                      className={getStatusColor(selectedMessage.status)}
                    >
                      {selectedMessage.status || "unread"}
                    </Badge>
                    {selectedMessage.priority === "high" && (
                      <Badge
                        variant="outline"
                        className={getPriorityColor(selectedMessage.priority)}
                      >
                        High Priority
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Subject */}
              <div>
                <Label className="text-gray-500 text-sm">Subject</Label>
                <h4 className="text-lg font-semibold text-gray-900 mt-1">
                  {selectedMessage.subject || "No Subject"}
                </h4>
              </div>

              {/* Message */}
              <div>
                <Label className="text-gray-500 text-sm">Message</Label>
                <div className="bg-gray-50 rounded-lg p-4 mt-2">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Received on{" "}
                {new Date(selectedMessage.created_at).toLocaleString()}
              </div>

              {/* Reply if exists */}
              {selectedMessage.status === "replied" &&
                selectedMessage.reply_message && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-gray-500 text-sm flex items-center gap-2">
                        <Reply className="w-4 h-4" />
                        Your Reply
                      </Label>
                      <div className="bg-[#A78B64]/10 rounded-lg p-4 mt-2 border-l-4 border-[#A78B64]">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedMessage.reply_message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Sent on{" "}
                          {selectedMessage.replied_at &&
                            new Date(
                              selectedMessage.replied_at
                            ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </>
                )}
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
            {selectedMessage && selectedMessage.status !== "replied" && (
              <Button
                onClick={() => {
                  setShowDetailsDialog(false);
                  openReplyDialog(selectedMessage);
                }}
                className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Replying to: {selectedMessage?.full_name} (
              {selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Original Message</Label>
              <div className="bg-gray-50 rounded-lg p-3 mt-2 text-sm text-gray-600">
                <p className="font-semibold mb-1">{selectedMessage?.subject}</p>
                <p className="line-clamp-3">{selectedMessage?.message}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="reply">Your Reply *</Label>
              <Textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={8}
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={!replyText.trim() || !!updating}
              className="bg-gradient-to-r from-[#A78B64] to-[#8B7355] hover:from-[#8B7355] hover:to-[#A78B64]"
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Reply className="w-4 h-4 mr-2" />
                  Send Reply
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message from{" "}
              {selectedMessage?.full_name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!updating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!!updating}
              className="bg-red-600 hover:bg-red-700"
            >
              {updating ? (
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
    </div>
  );
};

export default MessagesPage;
