import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TokenState {
  token: string;
  userId: string;
}

const initialState: TokenState = {
  token: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { accessToken, userId } = action.payload;
      state.token = accessToken;
      state.userId = userId;
    },
    clearToken: (state) => {
      state.token = "";
      state.userId = "";
    },
    clearUser: (state) => {
      state.userId = "";
    },
  },
});

export const { clearUser, clearToken, setToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
