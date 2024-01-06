'use client';

import React from 'react';
import s from './style.module.scss';
import ProductItem from './ProductItem';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import { IProductItem } from '@Modules/Home/ProductList/ProductItem';

const ProductList = (): React.ReactElement => {
  const { data: products, isLoading, error } = useGetProductsQuery('Product');

  const getErrorMessage = (error: any): string => {
    if (error && typeof error.status === 'number') {
      return `Error status: ${error.status}`;
    }
    return 'An error occurred';
  };

  return (
    <div className={`${s.productList} grid grid-cols-12`}>
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
