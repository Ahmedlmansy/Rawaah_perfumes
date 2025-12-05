import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem, CartProduct } from "@/types/cart";
import { createSupabaseClient } from "@/lib/supabase/client";
import { RootState } from "..";

const supabase = createSupabaseClient();
// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (userId: string) => {
    const { data } = await supabase
      .from("carts")
      .select("items")
      .eq("user_id", userId)
      .single();

    return (data?.items as CartItem[]) || [];
  }
);


// ADD TO CART
export const addToCartApi = createAsyncThunk(
  "cart/add",
  async (
    {
      userId,
      product,
      quantity,
    }: { userId: string; product: CartProduct; quantity: number },
    { getState }
  ) => {
    const state = getState() as RootState;
    const items: CartItem[] = state.cart.items;

    const existing = items.find(
      (item) => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existing) {
      updatedItems = items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...items, { product, quantity }];
    }

    await supabase.from("carts").upsert(
  {
    user_id: userId,
    items: updatedItems,
  },
  {
    onConflict: "user_id", 
  }
);


    return updatedItems;
  }
);


// . UPDATE QTY
export const updateQtyApi = createAsyncThunk(
  "cart/updateQty",
  async (
    {
      userId,
      productId,
      quantity,
    }: { userId: string; productId: string; quantity: number },
    { getState }
  ) => {
    const state = getState() as RootState;
    const items: CartItem[] = state.cart.items;

    const updatedItems = items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    await supabase
      .from("carts")
      .update({ items: updatedItems })
      .eq("user_id", userId);

    return updatedItems;
  }
);


//  REMOVE ITEM
export const removeFromCartApi = createAsyncThunk(
  "cart/remove",
  async (
    { userId, productId }: { userId: string; productId: string },
    { getState }
  ) => {
    const state = getState() as RootState;
    const items: CartItem[] = state.cart.items;

    const updatedItems = items.filter(
      (item) => item.product.id !== productId
    );

    await supabase
      .from("carts")
      .update({ items: updatedItems })
      .eq("user_id", userId);

    return updatedItems;
  }
);


//  CLEAR CART
export const clearCartApi = createAsyncThunk(
  "cart/clear",
  async (userId: string) => {
    await supabase
      .from("carts")
      .update({ items: [] })
      .eq("user_id", userId);

    return [];
  }
);
