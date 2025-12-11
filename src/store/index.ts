import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./features/brandSlice";
import notesReducer from "./features/notesSlice";
import productsReducer from "./features/allProductsSlice";
import productDetailsReducer from "./features/getProductDetailsSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";
import ordersReducer from "./features/ordersSlice";
import wishlistReducer from "./features/wishlistSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    notes: notesReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
    wishlist : wishlistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
