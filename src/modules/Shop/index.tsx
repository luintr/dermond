import React from 'react';
import s from './style.module.scss';
import ProductList from './ProductList';
import ShopHero from './ShopHero';

const ShopModule = () => {
  return (
    <div className={s.shopModule}>
      <ShopHero />
      <div
        className={`${s.container} container grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12`}
      >
        <ProductList />
      </div>
    </div>
  );
};

export default ShopModule;
