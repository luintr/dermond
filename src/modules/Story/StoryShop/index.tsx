'use client';

import React from 'react';
import s from './style.module.scss';
import { playfairFont } from '@/utils/fonts';
import ButtonNavigate from '@/components/ButtonNavigate';
import { ROUTE_PATH } from '@/constants/route';
import BoxParallax from '@/components/BoxParallax';
import Magnetic from '@/components/Magnetic';
import FadeHeading from '@/components/FadeHeading';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const StoryShop = () => {
  return (
    <section className={s.storyShop}>
      <div className={s.storyShop_wrap}>
        <div className={s.storyShop_image}>
          <BoxParallax offset={0.09}>
            <ImagePlaceholder
              src={'/images/src/serviceImg2.jpg'}
              alt={'image'}
              width={694}
              height={128}
            />
          </BoxParallax>
        </div>
        <div className={s.storyShop_content}>
          <FadeHeading
            className={`${s.storyShop_title} ${playfairFont.className}`}
          >
            SMALL LEATHER GOODS
          </FadeHeading>
          <FadeHeading>
            <Magnetic>
              <ButtonNavigate
                text="Shop Now"
                href={ROUTE_PATH.SHOP}
                className={s.button}
              />
            </Magnetic>
          </FadeHeading>
        </div>
      </div>
    </section>
  );
};

export default StoryShop;
