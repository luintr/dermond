'use client';

import React from 'react';

import s from './style.module.scss';
import LinkEffect from '@/components/LinkEffect';

export type IProductItem = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

const ProductItem = ({ data }: { data: IProductItem }): React.ReactElement => {
  const { _id, image, name, price } = data;

  return (
    <div className={`${s.productItem} col-span-3`}>
      <LinkEffect href={`/product/${_id}`}>
        <img className={s.productItem_image} src={image} alt={name} />
      </LinkEffect>

      <div className={s.productItem_content}>
        <LinkEffect href={`/product/${_id}`} className={s.productItem_content_title}>
          {name}
        </LinkEffect>
        <p className={s.productItem_content_price}>${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
