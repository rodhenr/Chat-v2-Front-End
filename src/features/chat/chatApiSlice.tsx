import { apiSlice } from "../../app/api/apiSlice";

interface Messages {
  avatar: string;
  contactId: string;
  createdAt: string | object;
  fullName: string;
  message: string;
  sender: string | null;
  status: string;
}

interface DataMain {
  avatar: string;
  connections: string[];
  fullName: string;
  messages: Messages[];
  status: string;
  userId: string;
}

interface ChatMessages {
  _id: string;
  createdAt: Date;
  message: string;
  receiver: string;
  sender: string;
}

interface DataChat {
  contactInfo: {
    avatar: string;
    contactId: string;
    fullName: string;
    status: string;
  };
  messageInfo: ChatMessages[];
  userInfo: {
    userId: string;
  };
}

interface MessageSent {
  msg: string;
  sender: string;
  receiver: string;
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    mainChatInfo: builder.query<DataMain, void>({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
    }),
    chatInfo: builder.query<DataChat, string>({
      query: (contactId) => ({
        url: `/chat/${contactId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation<void, MessageSent>({
      query: (data) => ({
        url: "/send",
        method: "POST",
        body: data,
      }),
    }),
    addUser: builder.mutation<void, string>({
      query: (contactId) => ({
        url: "/add",
        method: "POST",
        body: { contactId },
      }),
    }),
  }),
});

export const {
  useMainChatInfoQuery,
  useChatInfoQuery,
  useSendMessageMutation,
  useAddUserMutation,
} = chatApiSlice;
