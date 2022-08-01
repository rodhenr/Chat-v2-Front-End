import { apiSlice } from "../../app/api/apiSlice";

interface Messages {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
}

interface DataConnection {
  avatar: string;
  firstName: string;
  lastName: string;
  userId: string;
}

interface DataMain {
  avatar: string;
  connections: DataConnection[];
  fullName: string;
  messages: Messages[];
  userId: string;
}

interface DataChat {
  contactInfo: {
    avatar: string;
    contactId: string;
    fullName: string;
  };
  messages: Messages[];
  userInfo: {
    userId: string;
  };
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    mainChatInfo: builder.query<DataMain, void>({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    chatInfo: builder.query<DataChat, string>({
      query: (contactId) => ({
        url: `/chat/${contactId}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    addUser: builder.mutation<void, string>({
      query: (contactId) => ({
        url: "/add",
        method: "POST",
        body: { contactId },
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const { useMainChatInfoQuery, useChatInfoQuery, useAddUserMutation } =
  chatApiSlice;
