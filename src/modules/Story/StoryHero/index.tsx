'use client';
import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import Image from 'next/image';
import hero from '@Images/storyHeadImg.png';
import useSplitType from '@/hooks/useSplitType';
import gsap from 'gsap';

const StoryHero = () => {
  const headline = useRef<HTMLHeadingElement | null>(null);
  const splitTextRef = useSplitType(headline, { types: 'words, chars' });

  useEffect(() => {
    const chars = splitTextRef.current?.chars as HTMLElement[];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: {
            from: 'random',
            each: 0.025,
          },
          ease: 'power4.inOut',
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [splitTextRef]);

  return (
    <section className={s.storyHero}>
      <Container className={s.container}>
        <h2 ref={headline} className={s.storyHero_headline}>
          <div>
            Emphasize the use of premium fabrics, meticulous detailing, and
            personalized service.
          </div>
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
