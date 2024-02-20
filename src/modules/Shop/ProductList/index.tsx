'use client';

import React from 'react';
import s from './style.module.scss';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';

const ProductList = (): React.ReactElement => {
  const { data: products, isLoading, error } = useGetProductsQuery('Product');

  const getErrorMessage = (error: any): string => {
    if (error && typeof error.status === 'number') {
      return `Error status: ${error.status}`;
    }
    return 'An error occurred';
  };

  return (
    <div
      className={`${s.productList} col-span-10 col-start-2 grid grid-cols-12`}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>{getErrorMessage(error)}</div>
      ) : (
        products.data.map((product: IProductItem) => (
          <ProductItem key={product._id} data={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
