import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
}

interface State {
  connectedUsers: string[];
  messages: Message[] | [];
}

const initialState: State = {
  connectedUsers: [],
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    changeMessages: (state, action) => {
      const newMessages = action.payload;
      state.messages = newMessages;
    },
    addConnection: (state, action: PayloadAction<string>) => {
      const newConnection = action.payload;
      const checkUsers = state.connectedUsers.some((i) => i === newConnection);
      if (!checkUsers) state.connectedUsers.push(newConnection);
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      const newConnection = action.payload;
      const filteredArray = state.connectedUsers.filter(
        (i) => i !== newConnection
      );
      if (filteredArray) {
        state.connectedUsers = filteredArray;
      } else {
        state.connectedUsers = [];
      }
    },
  },
});

export const { addConnection, changeMessages, removeConnection } =
  messagesSlice.actions;

export default messagesSlice.reducer;
