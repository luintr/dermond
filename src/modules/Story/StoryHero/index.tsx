'use client';
import React, { useRef } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import Image from 'next/image';
import hero from '@Images/storyHeadImg.png';
import { useHeadlineFade } from '@/hooks/useHeadlineFade';

const StoryHero = () => {
  const headline = useRef<HTMLHeadingElement | null>(null);
  useHeadlineFade({ ref: headline });

  return (
    <section className={s.storyHero}>
      <Container className={s.container}>
        <h2 ref={headline} className={s.storyHero_headline}>
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
