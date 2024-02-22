'use client';
import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import Fade from '@/components/Fade';
import heroImg from '@Images/heroImg.jpg';
import Image from 'next/image';
import BoxParallax from '@/components/BoxParallax';
import { useHeadlineFade } from '@/hooks/useHeadlineFade';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const titleRef1 = useRef<HTMLHeadingElement | null>(null);
  const titleRef2 = useRef<HTMLHeadingElement | null>(null);
  const refLightMoon = useRef<HTMLDivElement | null>(null);

  useHeadlineFade({ ref: titleRef1, stagger: 0.25 });
  useHeadlineFade({ ref: titleRef2, stagger: 0.25 });

  useEffect(() => {
    if (!refLightMoon.current) return;
    const gsapContext = gsap.context(() => {
      gsap.to(refLightMoon.current, {
        y: function () {
          return 0.2 * ScrollTrigger.maxScroll(window);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: refLightMoon.current,
          start: 'top center',
          end: 'max',
          invalidateOnRefresh: true,
          scrub: true,
        },
      });
    }, [refLightMoon]);
    return () => gsapContext.revert();
  }, [refLightMoon]);

  return (
    <div className={s.heroSection_wrapper}>
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
              <BoxParallax offset={0.1}>
                <Image
                  src={heroImg.src}
                  width={heroImg.width}
                  height={heroImg.height}
                  alt={heroImg.src}
                />
              </BoxParallax>
            </div>
          </div>
        </Container>
      </section>
      <div className={s.eclipse}>
        <div className={`${s.moon_dark} ${s.moon}`} />
        <div className={`${s.moon_light} ${s.moon}`} ref={refLightMoon} />
      </div>
    </div>
  );
};

export default HeroSection;
