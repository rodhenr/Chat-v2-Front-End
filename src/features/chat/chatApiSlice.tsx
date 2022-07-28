import { apiSlice } from "../../app/api/apiSlice";

interface MessageInfo {
  avatar: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface Messages {
  _id: string;
  sender: null | MessageInfo;
  receiver: null | MessageInfo;
  message: string;
  createdAt: Date;
}

interface Data {
  fullName: string;
  avatar: string;
  messages: Messages[];
  status: string;
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfoUser: builder.query<Data, void>({
      query: () => ({
        url: "/chat",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInfoUserQuery } = chatApiSlice;