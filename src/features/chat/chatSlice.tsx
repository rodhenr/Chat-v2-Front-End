import { createSlice } from "@reduxjs/toolkit";

interface Message {
  createdAt: Date;
  message: string;
  receiver: string;
  sender: string;
}

interface State {
  contactId: string;
  isChatting: boolean;
  messages: Message[] | [];
  width: number;
}

const initialState: State = {
  contactId: "",
  isChatting: false,
  messages: [],
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
    changeMessages: (state, action) => {
      const newMessages = action.payload;
      state.messages = newMessages;
    },
  },
});

export const { changeWidth, changeMessages, setChatting } = chatSlice.actions;

export default chatSlice.reducer;
