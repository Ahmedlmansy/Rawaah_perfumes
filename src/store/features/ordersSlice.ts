import { createSlice } from "@reduxjs/toolkit";
import { createOrderApi, fetchOrdersApi, updateOrderStatusApi } from "../apis/ordersApi";
import { Product } from "@/types/products";
export type OrderItem = {
  id : string
  product: Product;
  quantity: number;
}
export type Order = {
  id?: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  address: string;
  phone: string;
  status: string;
  payment_method: "card" | "cash"
  created_at?: string;
  frist_name: string;
  last_name: string; 
  email: string;
};

type OrdersState = {
  items: Order[]; 
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  items: [],
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

    // ✅ CREATE ORDER (Checkout)
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
    })

    // ✅ FETCH ORDERS (Dashboard)
    .addCase(fetchOrdersApi.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOrdersApi.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchOrdersApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(updateOrderStatusApi.fulfilled, (state, action) => {
      const order = state.items.find(
        (o) => o.id === action.payload.orderId
      );
      if (order) {
        order.status = action.payload.status;
      }
    });
}

});

export const { resetOrderState } = ordersSlice.actions;

export default ordersSlice.reducer;
