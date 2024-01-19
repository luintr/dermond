import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import Image from 'next/image';
import hero from '@Images/storyHeadImg.png';

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
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt={'hero'}
          />
        </div>
      </Container>
    </section>
  );
};

export default StoryHero;
