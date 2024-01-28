'use client';

import React from 'react';

import s from './style.module.scss';
import Link from 'next/link';
import Fade from '@/components/Fade';
import { cinzelFont } from '@/utils/fonts';

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
  const { _id, image, name } = data;

  return (
    <Fade direction={'bottom'} from={'30px'} delayTrigger={0.5}>
      <div className={`${s.productItem}`}>
        <Link href={`/product/${_id}`}>
          <img className={s.productItem_image} src={image} alt={name} />
        </Link>
        <div className={s.productItem_content}>
          <Link
            href={`/product/${_id}`}
            className={`${s.productItem_content_title} ${cinzelFont.className}`}
          >
            {name}
          </Link>
        </div>
      </div>
    </Fade>
  );
};

export default ProductItem;
