'use client';
import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import Image from 'next/image';
import hero from '@Images/storyHeadImg.png';
import FadeHeading from '@/components/FadeHeading';
import Fade from '@/components/Fade';

const StoryHero = () => {
  return (
    <section className={s.storyHero}>
      <Container className={s.container}>
        <FadeHeading className={s.storyHero_headline}>
          Emphasize the use of premium fabrics, meticulous detailing, and
          personalized service.
        </FadeHeading>
        <Fade direction={'bottom'} from={'40px'} delayTrigger={0.5}>
          <div className={s.storyHero_img}>
            <Image
              src={hero.src}
              width={hero.width}
              height={hero.height}
              alt={'hero'}
            />
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default StoryHero;
