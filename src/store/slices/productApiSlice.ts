import { PRODUCTS_URL } from "@/constants/route";

import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (config) => ({
        url: PRODUCTS_URL,
        ...config
      }),
      keepUnusedDataFor: 5
    }),

    getProductDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    })
  })
})

export const { useGetProductsQuery, useGetProductDetailQuery } = productApiSlice