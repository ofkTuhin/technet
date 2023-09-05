/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `product`,
    }),
    getSingleProduct: builder.query({
      query: (id) => `product/${id}`,
    })
  }),
});

export const { useGetProductsQuery,useGetSingleProductQuery } = api;
