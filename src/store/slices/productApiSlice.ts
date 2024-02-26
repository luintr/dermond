import { PRODUCTS_URL } from '@/constants/route';

import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query({
      query: queryParam => ({
        url: `${PRODUCTS_URL}?page=${queryParam.page}&limit=${queryParam.limit}&sort=price,${queryParam.sort}&search=${queryParam.search}`,
      }),
      keepUnusedDataFor: 5,
    }),

    getProductDetail: builder.query({
      query: productId => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } =
  productApiSlice;
