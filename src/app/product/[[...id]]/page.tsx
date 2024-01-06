'use client';

import ProductModules from '@/modules/Product';
import { useGetProductDetailQuery } from '@/store/slices/productApiSlice';
import React from 'react';

const Product = ({ params }: any): React.ReactElement => {
  const [productId] = params.id;
  const { data: product } = useGetProductDetailQuery(productId);

  return <>{product && <ProductModules data={product.data} />}</>;
};

export default Product;
