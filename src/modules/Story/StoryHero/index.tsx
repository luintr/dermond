'use client';
import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import FadeHeading from '@/components/FadeHeading';
import Fade from '@/components/Fade';
import ImagePlaceholder from '@/components/ImagePlaceholder';

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
            <ImagePlaceholder
              src={'/images/src/storyHeadImg.png'}
              alt={'image'}
              width={1000}
              height={1000}
            />
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default StoryHero;
