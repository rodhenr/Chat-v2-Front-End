import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
}

interface State {
  contactId: string;
  isChatting: boolean;
  messages: Message[];
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
    newMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { changeWidth, newMessage, setChatting } = chatSlice.actions;

export default chatSlice.reducer;
