import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import image from '@Images/serviceImg2.jpg';
import Image from 'next/image';
import { playfairFont } from '@/utils/fonts';
import ButtonNavigate from '@/components/Button';
import { ROUTE_PATH } from '@/constants/route';
import BoxParallax from '@/components/BoxParallax';

const StoryShop = () => {
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
            <h2 className={`${s.storyShop_title} ${playfairFont.className}`}>
              SMALL LEATHER GOODS
            </h2>

            <ButtonNavigate
              text="Shop Now"
              href={ROUTE_PATH.LOGIN}
              className={s.button}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StoryShop;
