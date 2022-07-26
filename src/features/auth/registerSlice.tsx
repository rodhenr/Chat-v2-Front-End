import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSlice = createSlice({
  name: "register",
  initialState: {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errMsg: "",
  },
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
      const newData = action.payload;

      state.data = newData;
    },
    setError: (state, action) => {
      const newError = action.payload;

      state.errMsg = newError;
    },
  },
});

export const { setData, setError } = registerSlice.actions;

export default registerSlice.reducer;
