/* eslint-disable @typescript-eslint/no-explicit-any */
import { TDocument } from "@/types/documens.interface";
import { mainUrl } from "@/URL/main.url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const docsApi = createApi({
  reducerPath: "docsApi",
  tagTypes: ["Document"],
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
    createDoc: build.mutation<any, TDocument>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Document"],
    }),
    getDocuments: build.query<any, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Document"],
    }),
    updateDocument: build.mutation<any, { id: string; title: string }>({
      query: ({ id, ...body }) => ({
        url: id,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument: build.mutation<any, string>({
      query: (id) => ({
        url: id,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),

    getDocument: build.query<any, string>({
      query: (id) => ({
        url: id,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateDocMutation,
  useGetDocumentsQuery,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useGetDocumentQuery
} = docsApi;
