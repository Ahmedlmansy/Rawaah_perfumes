import { createSupabaseBrowser } from "@/lib/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk("profiles/allUsers", async () => {
  const supabase = createSupabaseBrowser();



  const { data: data } = await supabase
    .from("profiles")
    .select("*")

  return {
      users: data || [],
  };
});

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const supabase = createSupabaseBrowser();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
      id: user.id,
      name: user.user_metadata.name || null,
    email: user.email,
    role: profile?.role ?? "user",
  };
});