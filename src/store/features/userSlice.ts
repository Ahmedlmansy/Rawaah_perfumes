import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchAllUsers } from "../apis/userApi";

export type UserRole = "admin" | "worker" | "user";

export type UserProfile = {
  id: string;
  email: string;
  role: UserRole;
  name?: string | null;
  created_at: string
  total_orders: number
  total_spent : number
};

type UserState = {
  id: string | null;
  email: string | null;
  role: UserRole | null;

  users: UserProfile[];
  loading: boolean;
};

const initialState: UserState = {
  id: null,
  email: null,
  role: null,

  users: [],
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.email = null;
      state.role = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload?.id ?? null;
        state.email = action.payload?.email ?? null;
        state.role = action.payload?.role ?? null;
      })


      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.users ?? [];
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
