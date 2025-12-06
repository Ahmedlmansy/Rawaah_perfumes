import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../apis/userApi";

export type UserRole = "admin" | "worker" | "user";

type UserState = {
  id: string | null;
  email: string | null;
  role: UserRole | null;
  loading: boolean;
};

const initialState: UserState = {
  id: null,
  email: null,
  role: null,
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
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
