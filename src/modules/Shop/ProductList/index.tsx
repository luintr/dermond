'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import LoadingComp from '@Components/LoadingComp';
import { Search } from '@/components/Icons';
import useDebounce from '@/hooks/useDebounce';

const ProductList = (): React.ReactElement => {
  const { data: products, isLoading, error } = useGetProductsQuery('Product');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clothes, setClothes] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getErrorMessage = (error: any): string => {
    if (error && typeof error.status === 'number') {
      return `Error status: ${error.status}`;
    }
    return 'An error occurred';
  };

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const searchClothe = (searchValue: string) => {
    let res = products.data.filter(
      (item: IProductItem) => item.name == searchValue
    );
    setClothes(res);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchClothe(debouncedSearchTerm);
    } else {
      setClothes(products?.products);
    }
  }, [debouncedSearchTerm, products]);

  return (
    <>
      <div className={`${s.search} col-span-6 col-start-5`}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Search />
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
