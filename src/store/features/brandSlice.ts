import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brandsApi } from "../apis/brandsApi";


// type from api
export interface  Brand {
  id: string;
  name: string;
  image: string;
  created_at: string;
  brand_type: string
}

interface BrandState {
  items: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState : BrandState = {
    items: [],
    loading: false,
    error: null,
}
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async () => {
    const data = await brandsApi.getBrands();
    return data;
  }
);



const brandSlice = createSlice({
  name: "brands",
 initialState,
  reducers: {},
  extraReducers: (builder) => {
  builder
    .addCase(fetchBrands.pending, (state) => {
      console.log("Fetching brands...");
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(fetchBrands.rejected, (state, action) => {
      console.log(" Fetch failed:", action.error.message);
      state.loading = false;
      state.error = action.error.message!;
    });
},
});

export default brandSlice.reducer;
