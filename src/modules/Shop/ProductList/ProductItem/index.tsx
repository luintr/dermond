'use client';

import React from 'react';

import s from './style.module.scss';
import Fade from '@/components/Fade';
import { cinzelFont } from '@/utils/fonts';
import LinkEffect from '@/components/LinkEffect';
import Image from 'next/image';

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
      <div className={`${s.productItem} col-span-4`}>
        <div className={`${s.productItem_image_link}`}>
          <LinkEffect href={`/product/${_id}`}>
            <div className={s.productItem_image_wrapper}>
              <Image
                className={s.productItem_image_inner}
                sizes={'10000px'}
                src={image}
                alt={name}
                fill
              />
            </div>
          </LinkEffect>
        </div>
        <div className={s.divider} />

        <div className={s.productItem_content}>
          <LinkEffect
            href={`/product/${_id}`}
            className={`${s.productItem_content_title} ${cinzelFont.className}`}
          >
            {name}
          </LinkEffect>
        </div>
        <div className={s.dividers}>
          <div />
          <div />
        </div>
      </div>
    </Fade>
  );
};

export default ProductItem;
