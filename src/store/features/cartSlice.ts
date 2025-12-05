import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addToCartApi,
  updateQtyApi,
  removeFromCartApi,
  clearCartApi,
} from "../apis/cartApi";
import { CartItem } from "@/types/cart";

type CartState = {
  items: CartItem[];
  loading: boolean;
};

const initialState: CartState = {
  items: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    //  ADD
    builder.addCase(addToCartApi.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    //  UPDATE
    builder.addCase(updateQtyApi.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    //  REMOVE
    builder.addCase(removeFromCartApi.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    //  CLEAR
    builder.addCase(clearCartApi.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default cartSlice.reducer;
