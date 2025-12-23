import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchWishlist,
  addToWishlistApi,
  removeFromWishlistApi,
  clearWishlistApi,
} from "../apis/wishlistApi";
import { WishlistItem, WishlistProduct } from "@/types/wishlist";

type WishlistState = {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
};

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchWishlist.fulfilled,
      (state, action: PayloadAction<WishlistItem[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      }
    );

    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addToWishlistApi.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      addToWishlistApi.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: string;
          user_id: string;
          created_at: string;
          items: WishlistProduct;
        }>
      ) => {
        state.loading = false;
        state.items.push({
          items: action.payload.items,
        });
      }
    );

    builder.addCase(addToWishlistApi.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    builder.addCase(removeFromWishlistApi.pending, (state) => {
      state.loading = true;
    });

  builder.addCase(
  removeFromWishlistApi.fulfilled,
  (state, action: PayloadAction<string>) => {
    state.loading = false;

    state.items = state.items.filter(
      (item) => item.id !== action.payload
    );
  }
);


    builder.addCase(removeFromWishlistApi.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });

    builder.addCase(clearWishlistApi.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(clearWishlistApi.fulfilled, (state) => {
      state.loading = false;
      state.items = [];
    });

    builder.addCase(clearWishlistApi.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
  },
});

export default wishlistSlice.reducer;
