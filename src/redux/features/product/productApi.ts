import { api } from "@/redux/api/apiSlice";

const productApi=api.injectEndpoints({
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
            method: 'POST',
            body: data,
          }),
          invalidatesTags:["comments"]
        }),
        getComment: builder.query({
          query: (id) => `product/comment/${id}`,
          providesTags:["comments"]
        }),
      }),
})

export const { useGetProductsQuery,useGetSingleProductQuery,usePostCommetMutation,useGetCommentQuery } =productApi