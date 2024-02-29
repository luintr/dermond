'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import LoadingComp from '@Components/LoadingComp';
import { ArrowUp, Search } from '@/components/Icons';
import InfiniteScroll from '@/components/InfiniteScroll';

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
    limit: 6,
    sort: '',
    search: '',
  });

  const { data: products, isLoading, error } = useGetProductsQuery(queryParams);

  const [clothes, setClothes] = useState<IProductItem[]>([]);
  const [total, setTotal] = useState<number>(0);

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

  useEffect(() => {
    if (products) {
      setClothes(prevItems => [...prevItems, ...products.data]);
      setTotal(products.total);
    }
  }, [isLoading, products]);

  return (
    <>
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
      <InfiniteScroll
        loader={<LoadingComp />}
        className={`${s.productList} col-span-10 col-start-2 grid grid-cols-12`}
        fetchMore={() => {
          setQueryParams({ ...queryParams, page: queryParams.page + 1 });
          console.log(queryParams);
        }}
        hasMore={clothes.length < total}
        endMessage={<p></p>}
      >
        {clothes &&
          clothes.map((product: IProductItem) => (
            <ProductItem key={product._id} data={product} />
          ))}
      </InfiniteScroll>
    </>
  );
};

export default ProductList;
