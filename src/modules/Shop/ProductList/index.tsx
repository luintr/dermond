'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import LoadingComp from '@Components/LoadingComp';
import { ArrowUp, Search } from '@/components/Icons';
import { AnyARecord } from 'dns';

const ProductList = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [queryParams, setQueryParams] = useState<any>({
    page: '1',
    limit: 9,
    sort: 'desc',
    search: '',
  });

  const { data: products, isLoading, error } = useGetProductsQuery(queryParams);

  const getErrorMessage = (error: any): string => {
    if (error && typeof error.status === 'number') {
      return `Error status: ${error.status}`;
    }
    return 'An error occurred';
  };

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // setQueryParams("?page=1&limit=9&sort=price,desc&search=");
  }, []);

  return (
    <>
      <div className={`${s.search} col-span-4 col-start-5 mb-10`}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          // onSubmit={() => {setQueryParams('')}}
        />
        <Search />
      </div>
      <div className={`col-span-2 col-start-10 flex items-center mb-10`}>
        <span> Sorted by:</span>
        <span className="text[2rem] mx-5 cursor-pointer"> PRICE</span>
        <ArrowUp />
      </div>
      <div
        className={`${s.productList} col-span-10 col-start-2 grid grid-cols-12`}
      >
        {isLoading ? (
          <LoadingComp />
        ) : error ? (
          <div>{getErrorMessage(error)}</div>
        ) : (
          products.data.map((product: IProductItem) => (
            <ProductItem key={product._id} data={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;
