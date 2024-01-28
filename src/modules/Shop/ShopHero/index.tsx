import React from 'react';
import s from './style.module.scss';
import image from '@Images/shopHero.jpg';
import Image from 'next/image';
import { playfairFont } from '@/utils/fonts';
import BoxParallax from '@/components/BoxParallax';

const ShopHero = () => {
  return (
    <section className={`${s.shopHero} `}>
      <div className={s.shopHero_img}>
        <BoxParallax>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt="image"
          />
        </BoxParallax>
      </div>
      <div className={`${s.shopHero_content} container grid grid-cols-12`}>
        <div className={`${s.wrapContent} col-span-6 col-start-2`}>
          <div className={s.verticalLine}></div>
          <div className={s.horizontalLine}></div>
          <h2 className={`${s.shopHero_title} ${playfairFont.className}`}>
            TIS THE SEASON 50% SALE OFF
          </h2>
          <p className={`${s.shopHero_desc}`}>
            The list of products sold at &quot;better prices&quot; is only sold
            online - Online Only. They have been making waves for a while and
            are currently in a situation where sizes and numbers are out of
            stock.
          </p>
          <p className={s.shopHero_link}>@dermond.vn</p>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
