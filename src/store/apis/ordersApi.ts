import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSupabaseClient } from "@/lib/supabase/client";
import { CartItem } from "@/types/cart";

const supabase = createSupabaseClient();

export const createOrderApi = createAsyncThunk(
  "orders/create",
  async (
    {
      userId,
      items,
      total,
           address,
            frist_name,
          last_name, 
    email,
    payment_method,
    phone,
      
    }: {
      userId: string;
      items:  CartItem[];
      total: number;
              address: string;
              frist_name: string;
              last_name: string;
        email: string;
      phone: string;
      payment_method: "card" | "cash",
    },
    { rejectWithValue }
  ) => {
    const { error } = await supabase.from("orders").insert({
      user_id: userId,
      items,
      total,
        address,
           frist_name,
          last_name, 
    email,
        phone,
      payment_method: payment_method,
      status: "pending",
    });

    if (error) return rejectWithValue(error.message);
    return true;
  }
);

export const fetchOrdersApi = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const updateOrderStatusApi = createAsyncThunk(
  "orders/updateStatus",
  async (
    { orderId, status }: { orderId: string; status: string },
    { rejectWithValue }
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) return rejectWithValue(error.message);
    return { orderId, status };
  }
);
