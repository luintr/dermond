import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import Image from 'next/image';
import image from '@Images/StoryHead.png';

const StoryHero = () => {
  return (
    <section className={s.storyHero}>
      <Container className={s.container}>
        <h2 className={s.storyHero_headline}>
          Emphasize the use of premium fabrics, meticulous detailing, and
          personalized service.
        </h2>
        <div className={s.storyHero_img}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={'image'}
          />
        </div>
      </Container>
    </section>
  );
};

export default StoryHero;
