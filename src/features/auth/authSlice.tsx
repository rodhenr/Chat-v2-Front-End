import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TokenState {
  token: string;
}

const initialState: TokenState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload?.accessToken;
      state.token = token;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
