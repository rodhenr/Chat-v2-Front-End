import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setToken, clearToken } from "../../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult.data) {
      api.dispatch(setToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearToken());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chat", "Messages"],
  endpoints: () => ({}),
});
