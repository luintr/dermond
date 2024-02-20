'use client';

import React, { useRef } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import image from '@Images/serviceImg2.jpg';
import Image from 'next/image';
import { playfairFont } from '@/utils/fonts';
import ButtonNavigate from '@/components/ButtonNavigate';
import { ROUTE_PATH } from '@/constants/route';
import BoxParallax from '@/components/BoxParallax';
import Magnetic from '@/components/Magnetic';
import { useHeadlineFade } from '@/hooks/useHeadlineFade';

const StoryShop = () => {
  const headline = useRef<HTMLHeadingElement | null>(null);

  useHeadlineFade({ ref: headline });
  return (
    <section className={s.storyShop}>
      <Container className={s.container}>
        <div className={s.storyShop_wrap}>
          <div className={s.storyShop_image}>
            <BoxParallax offset={0.09}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={'image'}
              />
            </BoxParallax>
          </div>
          <div className={s.storyShop_content}>
            <h2
              ref={headline}
              className={`${s.storyShop_title} ${playfairFont.className}`}
            >
              SMALL LEATHER GOODS
            </h2>

            <Magnetic>
              <ButtonNavigate
                text="Shop Now"
                href={ROUTE_PATH.LOGIN}
                className={s.button}
              />
            </Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StoryShop;
