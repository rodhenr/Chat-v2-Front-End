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
  },
  reducers: {
    setData: (state, action: PayloadAction<Data>) => {
      const newData = action.payload;

      state.data = newData;
    },
  },
});

export const { setData } = registerSlice.actions;

export default registerSlice.reducer;
