/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes:["comment"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `product`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `product/${id}`,
    }),
    postCommet:builder.mutation({
      query: ({ id, ...data }) => ({
        url: `product/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags:["comment"]
    }),
    getComment: builder.query({
      query: (id) => `product/comment/${id}`,
      providesTags:["comment"]
    }),
  }),
});

export const { useGetProductsQuery,useGetSingleProductQuery,usePostCommetMutation,useGetCommentQuery } = api;
