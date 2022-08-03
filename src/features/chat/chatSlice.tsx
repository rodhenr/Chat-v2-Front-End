import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: string;
  message: string;
  read: boolean;
  receiver: string;
  sender: string;
}

interface DataConnection {
  avatar: string;
  fullName: string;
  message: Message;
  notRead: number;
  userId: string;
}

interface State {
  connectedUsers: string[];
  contactId: string;
  isChatting: boolean;
  messages: Message[];
  messagesHome: DataConnection[];
  width: number;
}

const initialState: State = {
  connectedUsers: [],
  contactId: "",
  isChatting: false,
  messages: [],
  messagesHome: [],
  width: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addConnection: (state, action: PayloadAction<string>) => {
      const check = state.connectedUsers.some((i) => i === action.payload);
      if (!check) {
        state.connectedUsers.push(action.payload);
      }
    },
    addMessagesHome: (state, action: PayloadAction<Message>) => {
      const { sender, receiver } = action.payload;

      const newMessages = state.messagesHome.map((i) => {
        if (
          (i.message.sender === sender && i.message.receiver === receiver) ||
          (i.message.sender === receiver && i.message.receiver === sender)
        ) {
          return {...i, message: action.payload}
        } else {
          return i;
        }
      });

      state.messagesHome = newMessages;
    },
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
    removeConnection: (state, action: PayloadAction<string>) => {
      const check = state.connectedUsers.some((i) => i === action.payload);
      if (check) {
        state.connectedUsers = state.connectedUsers.filter(
          (i) => i !== action.payload
        );
      }
    },
    setMessages: (state, action: PayloadAction<Message[] | []>) => {
      state.messages = action.payload;
    },
    setMessagesHome: (state, action: PayloadAction<DataConnection[] | []>) => {
      state.messagesHome = action.payload;
    },
    usersConnected: (state, action: PayloadAction<string[]>) => {
      state.connectedUsers = action.payload;
    },
  },
});

export const {
  addConnection,
  addMessagesHome,
  changeWidth,
  newMessage,
  removeConnection,
  setChatting,
  setMessages,
  setMessagesHome,
  usersConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
