'use client';

import React from 'react';

import s from './style.module.scss';
import Fade from '@/components/Fade';
import { cinzelFont } from '@/utils/fonts';
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
  const { _id, image, name } = data;

  return (
    <Fade direction={'bottom'} from={'30px'} delayTrigger={0.5}>
      <div className={`${s.productItem}`}>
        <LinkEffect href={`/product/${_id}`}>
          <img className={s.productItem_image} src={image} alt={name} />
        </LinkEffect>
        <div className={s.productItem_content}>
          <LinkEffect
            href={`/product/${_id}`}
            className={`${s.productItem_content_title} ${cinzelFont.className}`}
          >
            {name}
          </LinkEffect>
        </div>
      </div>
    </Fade>
  );
};

export default ProductItem;
