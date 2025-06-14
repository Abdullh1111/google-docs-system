/* eslint-disable @typescript-eslint/no-explicit-any */
import { mainUrl } from "@/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const docsApi = createApi({
  reducerPath: "docsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${mainUrl}/docs/`,
    credentials: "include",

    prepareHeaders(headers) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints: (build) => ({
    createDoc: build.mutation<any, any>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    })
  }),
});

export const {
  useCreateDocMutation
} = docsApi;