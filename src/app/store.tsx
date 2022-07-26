import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "../features/auth/registerSlice";
import loginSlice from "../features/auth/loginSlice";
import { apiSlice } from "./api/apiSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    register: registerSlice,
    login: loginSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
