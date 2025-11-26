import { configureStore } from "@reduxjs/toolkit";
import brandReducer from "./features/brandSlice";
import notesReducer from "./features/notesSlice";

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    notes : notesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
