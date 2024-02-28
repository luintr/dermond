'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import LoadingComp from '@Components/LoadingComp';
import { ArrowUp, Search } from '@/components/Icons';
import Fade from '@/components/Fade';

export type IProductsQuery = {
  page: number;
  limit: number;
  sort: string;
  search: string;
};

const ProductList = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [queryParams, setQueryParams] = useState<IProductsQuery>({
    page: 1,
    limit: 9,
    sort: '',
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

  const handleSortByPrice = () => {
    if (queryParams?.sort === 'desc') {
      setQueryParams({ ...queryParams, sort: 'asc' });
    } else {
      setQueryParams({ ...queryParams, sort: 'desc' });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setQueryParams({ ...queryParams, search: searchTerm });
  };

  return (
    <>
      <Fade direction={'bottom'} from={'30px'} delayTrigger={0.5}>
        <form
          className={`${s.search} col-span-4 col-start-5 mb-10`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <Search />
        </form>
      </Fade>
      <Fade direction={'bottom'} from={'30px'} delayTrigger={0.5}>
        <div
          onClick={handleSortByPrice}
          className={`col-span-2 col-start-10 flex items-center mb-10 cursor-pointer`}
        >
          <span> Sorted by:</span>
          {queryParams.sort === '' ? (
            <span className="text[2rem] mx-5"> NEWEST</span>
          ) : (
            <>
              <span className="text[2rem] mx-5">PRICE</span>
              <span
                style={{
                  transform: `${queryParams.sort === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                }}
              >
                <ArrowUp />
              </span>
            </>
          )}
        </div>
      </Fade>
      <div
        className={`${s.productList} col-span-10 col-start-2 grid grid-cols-12`}
      >
        {isLoading ? (
          <div className="col-span-2 col-start-6">
            <LoadingComp />
          </div>
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
