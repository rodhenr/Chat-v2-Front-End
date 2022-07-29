import { apiSlice } from "../../app/api/apiSlice";

interface MessageInfo {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface Messages {
  _id: string;
  sender: MessageInfo | null;
  receiver: MessageInfo | null;
  message: string;
  createdAt: Date;
}

interface Data {
  fullName: string;
  avatar: string;
  messages: Messages[];
  status: string;
}

interface MessagesChat {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
}

interface Chat {
  data: MessagesChat[];
  userId: string;
  chatInfo: MessageInfo
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfoUser: builder.query<Data, void>({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
    }),
    getChatInfo: builder.query<Chat, string>({
      query: (id) => ({
        url: `/chat/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInfoUserQuery, useGetChatInfoQuery } = chatApiSlice;
