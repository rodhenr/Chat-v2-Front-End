import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
}

interface State {
  connectedUsers: string[];
  contactId: string;
  isChatting: boolean;
  messages: Message[];
  width: number;
}

const initialState: State = {
  connectedUsers: [],
  contactId: "",
  isChatting: false,
  messages: [],
  width: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeWidth: (state, action: PayloadAction<number>) => {
      const width = action.payload;
      state.width = width;
    },
    newMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setChatting: (state, action) => {
      const { contactId, isChatting } = action.payload;
      state.contactId = contactId;
      state.isChatting = isChatting;
    },
    setMessages: (state, action: PayloadAction<Message[] | []>) => {
      state.messages = action.payload;
    },
    usersConnected: (state, action: PayloadAction<string[]>) => {
      state.connectedUsers = action.payload;
    },
    addConnection: (state, action: PayloadAction<string>) => {
      const check = state.connectedUsers.some((i) => i === action.payload);
      if (!check) {
        state.connectedUsers.push(action.payload);
      }
    },
    removeConnection: (state, action: PayloadAction<string>) => {
      const check = state.connectedUsers.some((i) => i === action.payload);
      if (check) {
        state.connectedUsers = state.connectedUsers.filter(
          (i) => i !== action.payload
        );
      }
    },
  },
});

export const {
  addConnection,
  changeWidth,
  newMessage,
  removeConnection,
  setChatting,
  setMessages,
  usersConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
