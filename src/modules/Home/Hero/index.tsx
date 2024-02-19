'use client';
import React, { useRef } from 'react';
import s from './styles.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import Fade from '@/components/Fade';
import heroImg from '@Images/heroImg.jpg';
import Image from 'next/image';
import BoxParallax from '@/components/BoxParallax';
import { useHeadlineFade } from '@/hooks/useHeadlineFade';

const HeroSection = () => {
  const titleRef1 = useRef<HTMLHeadingElement | null>(null);
  const titleRef2 = useRef<HTMLHeadingElement | null>(null);

  useHeadlineFade({ ref: titleRef1, stagger: 0.25 });
  useHeadlineFade({ ref: titleRef2, stagger: 0.25 });

  return (
    <section className={s.heroSection}>
      <Container className={s.heroSection_container}>
        <div className={`${s.topHero} grid grid-cols-12`}>
          <div className={`${s.topHero_left} col-span-2 col-start-2`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
              <p>TAILOR SHOP BASED IN VIETNAM</p>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p>ETS 2019</p>
            </Fade>
          </div>
          <div className={`${s.topHero_middle} col-span-2 col-start-6`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
              <p>INSTAGRAM: @DERMOND.VN</p>
            </Fade>
          </div>
          <div className={`${s.topHero_right} col-span-2 col-start-10`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
              <p>HN 16:59</p>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p>19 DEC 2023</p>
            </Fade>
          </div>
        </div>
        <div className={`${s.bottomHero} grid grid-cols-12`}>
          <div
            className={`${s.bottomHero_title} ${cinzelFont.className} col-span-6 col-start-4`}
          >
            <h2 ref={titleRef1}>DER</h2>
            <h2 ref={titleRef2}>MOND</h2>
          </div>
          <div className={`${s.bottomHero_wrapImage} col-span-6 col-start-4`}>
            <Image
              src={heroImg.src}
              width={heroImg.width}
              height={heroImg.height}
              alt={heroImg.src}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
