import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productDetails } from "../apis/getProductsByIdApi";

export interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount_price?: number;
  type?: string[];
  image: string;
  size?: number;
  stock?: number;
  Best_Sellers?: boolean;
  season?: string;
  description?: string;
  notes?: string[];
}

interface ProductDetailsState {
  data: ProductDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailsState = {
  data: null,
  loading: false,
  error: null,
};


export const fetchProductDetails = createAsyncThunk<
  ProductDetails,
  string,        
  { rejectValue: string } 
>(
  "productDetails/fetchProductDetails",
  async (id, thunkAPI) => {
    try {
      const data = await productDetails.getProductDetailsApi(id);
      return data[0];
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
