import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Messages {
  createdAt: string;
  message: string;
  read: boolean;
  receiver: string;
  sender: string;
}

interface DataConnection {
  avatar: string;
  fullName: string;
  message: Messages;
  notRead: number;
  userId: string;
}

interface State {
  connectedUsers: string[];
  contactId: string;
  isChatting: boolean;
  messages: Messages[];
  messagesHome: DataConnection[];
  myId: string;
  width: number;
}

const initialState: State = {
  connectedUsers: [],
  contactId: "",
  isChatting: false,
  messages: [],
  messagesHome: [],
  myId: "",
  width: 0,
};
// só recebe notificação no modo desktop
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
    addMessagesHome: (state, action: PayloadAction<Messages>) => {
      const { sender } = action.payload;

      const newMessages = state.messagesHome.map((i) => {
        if (sender === i.userId && state.width < 900) {
          return { ...i, notRead: i.notRead + 1, message: action.payload };
        } else if (sender === i.userId && i.userId === state.contactId) {
          return { ...i, message: action.payload };
        } else if (sender === i.userId && i.userId !== state.contactId) {
          return { ...i, notRead: i.notRead + 1, message: action.payload };
        } else {
          return i;
        }
      });

      state.messagesHome = newMessages;
    },
    changeMessagesHome: (state, action: PayloadAction<string>) => {
      const newMessages = state.messagesHome.map((i) => {
        if (i.userId === action.payload) {
          if (Object.keys(i.message).length > 0) {
            return { ...i, notRead: 0, message: { ...i.message, read: true } };
          } else {
            return i;
          }
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
    newMessage: (state, action: PayloadAction<Messages>) => {
      const { sender } = action.payload;

      if (sender === state.myId) {
        state.messages.push(action.payload);
      } else if (sender !== state.contactId) {
        const newMessages = state.messagesHome.map((i) => {
          if (sender === i.userId) {
            return { ...i, message: action.payload };
          } else {
            return i;
          }
        });

        state.messagesHome = newMessages;
      } else {
        state.messages.push(action.payload);
      }
    },
    setChatting: (
      state,
      action: PayloadAction<{ contactId: string; isChatting: boolean }>
    ) => {
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
    setMessages: (state, action: PayloadAction<Messages[] | []>) => {
      state.messages = action.payload;
    },
    setMessagesHome: (state, action: PayloadAction<DataConnection[] | []>) => {
      state.messagesHome = action.payload;
    },
    setMyId: (state, action: PayloadAction<string>) => {
      state.myId = action.payload;
    },
    usersConnected: (state, action: PayloadAction<string[]>) => {
      state.connectedUsers = action.payload;
    },
  },
});

export const {
  addConnection,
  addMessagesHome,
  changeMessagesHome,
  changeWidth,
  newMessage,
  removeConnection,
  setChatting,
  setMessages,
  setMessagesHome,
  setMyId,
  usersConnected,
} = chatSlice.actions;

export default chatSlice.reducer;
