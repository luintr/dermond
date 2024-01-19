import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import image from '@Images/serviceImg2.jpg';
import Image from 'next/image';
import { playfairFont } from '@/utils/fonts';
import ButtonNavigate from '@/components/Button';
import { ROUTE_PATH } from '@/constants/route';

const StoryShop = () => {
  return (
    <section className={s.storyShop}>
      <Container className={s.container}>
        <div className={s.storyShop_wrap}>
          <div className={s.storyShop_image}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={'image'}
            />
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
