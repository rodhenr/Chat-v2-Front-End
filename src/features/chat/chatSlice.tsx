import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactId: "",
  isChatting: false,
  width: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatting: (state, action) => {
      const { contactId, isChatting } = action.payload;
      state.contactId = contactId;
      state.isChatting = isChatting;
    },
    changeWidth: (state, action) => {
      const width = action.payload;
      state.width = width;
    },
  },
});

export const { changeWidth, setChatting } = chatSlice.actions;

export default chatSlice.reducer;
