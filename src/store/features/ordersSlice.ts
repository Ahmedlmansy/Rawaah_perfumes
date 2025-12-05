import { createSlice } from "@reduxjs/toolkit";
import { createOrderApi } from "../apis/ordersApi";

export type Order = {
  id?: string;
  user_id: string;
  items: [];
  total: number;
  address: string;
  phone: string;
  status: string;
  payment_method: "card" | "cash"
  created_at?: string;
};

type OrdersState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  loading: false,
  success: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ CREATE ORDER
      .addCase(createOrderApi.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrderApi.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrderApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState } = ordersSlice.actions;

export default ordersSlice.reducer;
