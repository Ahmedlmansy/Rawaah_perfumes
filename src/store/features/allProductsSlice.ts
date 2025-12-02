import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { allProductsApi  } from "../apis/allProductsApi"

export interface Products{
    id: number
    name: string
    created_at: string
    brand: string
    price: number
    discount_price: number
    type: string
    image: string
    size: string
    stock: number
    Best_Sellers : number
}
interface ProductsState {
      items: Products[];
      loading: boolean;
      error: string | null;
}

const initialState : ProductsState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk(
    "products/allProducts",
    async () => {
        const products = await allProductsApi.getProducts()
        return products
     }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
          builder
            .addCase(fetchProducts.pending, (state) => {
              console.log("Fetching products...");
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
              state.loading = false;
              state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
              console.log(" Fetch failed:", action.error.message);
              state.loading = false;
              state.error = action.error.message!;
            });
    }
})
export default productsSlice.reducer