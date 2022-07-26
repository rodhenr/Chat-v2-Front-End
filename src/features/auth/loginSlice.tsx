import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  email: string;
  password: string;
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: {
      email: "",
      password: "",
    },
    errorMsg: "",
  },
  reducers: {
    loginData: (state, action: PayloadAction<Data>) => {
      const newData = action.payload;

      state.login = newData;
    },
    loginError: (state, action) => {
      const newError = action.payload;

      state.errorMsg = newError;
    },
  },
});

export const { loginData, loginError } = loginSlice.actions;
export default loginSlice.reducer;
