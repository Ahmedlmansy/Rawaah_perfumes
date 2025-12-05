import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./features/brandSlice";
import notesReducer from "./features/notesSlice";
import productsReducer from "./features/allProductsSlice";
import productDetailsReducer from "./features/getProductDetailsSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    notes: notesReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
