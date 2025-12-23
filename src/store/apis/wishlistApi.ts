import { createSupabaseClient } from "@/lib/supabase/client";
import { WishlistProduct } from "@/types/wishlist";
import { createAsyncThunk } from "@reduxjs/toolkit";

const supabase = createSupabaseClient();

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (userId: string, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        // If no wishlist exists, return empty array
        if (error.code === 'PGRST116') {
          return [];
        }
        throw error;
      }

      // Return the items array
      return data?.items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addToWishlistApi = createAsyncThunk(
  "wishlist/add",
  async ({ product }: { product: WishlistProduct }, thunkAPI) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("User not authenticated");

      // Fetch existing wishlist
      const { data: existingWishlist, error: fetchError } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      let updatedItems: WishlistProduct[] = [];

      if (existingWishlist) {
        // Wishlist exists, check if product already added
        const items = existingWishlist.items || [];
        
        const productExists = items.some(
          (item: WishlistProduct) => item.id === product.id
        );

        if (productExists) {
          throw new Error("Product already in wishlist");
        }

        // Add new product to existing items
        updatedItems = [...items, product];

        // Update the wishlist
        const { data, error } = await supabase
          .from("wishlist")
          .update({ items: updatedItems })
          .eq("user_id", user.id)
          .select("*")
          .single();

        if (error) throw error;

        return data;
      } else {
        // Create new wishlist with first product
        updatedItems = [product];

        const { data, error } = await supabase
          .from("wishlist")
          .insert([
            {
              user_id: user.id,
              items: updatedItems,
            },
          ])
          .select("*")
          .single();

        if (error) throw error;

        return data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeFromWishlistApi = createAsyncThunk<
  string,
  { userId: string; productId: string },
  { rejectValue: string }
>(
  "wishlist/remove",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const { data: wishlist, error } = await supabase
        .from("wishlist")
        .select("items")
        .eq("user_id", userId)
        .single();

      if (error || !wishlist) {
        throw new Error("Wishlist not found");
      }

      const updatedItems = (wishlist.items || []).filter(
        (item: WishlistProduct) => item.id !== productId
      );

      const { error: updateError } = await supabase
        .from("wishlist")
        .update({ items: updatedItems })
        .eq("user_id", userId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      return productId;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Failed to remove item from wishlist");
    }
  }
);

export const clearWishlistApi = createAsyncThunk(
  "wishlist/clear",
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      // Update items to empty array or delete the row
      const { error } = await supabase
        .from("wishlist")
        .update({ items: [] })
        .eq("user_id", userId);

      if (error) throw error;

      return userId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);