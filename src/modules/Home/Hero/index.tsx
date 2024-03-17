'use client';
import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import Fade from '@/components/Fade';
import FadeHeading from '@/components/FadeHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useScrollTrigger } from '@Hooks/useScrollTrigger';
import useUiContext from '@Context/uiContext';
import ImagePlaceholder from '@/components/ImagePlaceholder';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const refLightMoon = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const wrapImage = useRef<HTMLDivElement | null>(null);
  const { isPageEnter } = useUiContext();

  useEffect(() => {
    if (!refLightMoon.current) return;
    const gsapContext = gsap.context(() => {
      gsap.to(refLightMoon.current, {
        y: function () {
          return 0.03 * ScrollTrigger.maxScroll(window);
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

  useScrollTrigger(
    {
      trigger: imageRef,
      start: 'top bottom',
      onEnter: () => {
        if (isPageEnter) {
          gsap.to(wrapImage.current, {
            clipPath: 'inset(0 0 0% 0)',
            ease: 'power4.out',
            duration: 1,
          });
          gsap.to(imageRef.current, {
            scale: 1,
            ease: 'power4.out',
            duration: 1,
          });
        }
      },
    },
    [imageRef, wrapImage, isPageEnter]
  );

  // useGSAP(() => {
  //     if (isPageEnter) {
  //         gsap.to(wrapImage.current, {
  //             clipPath: 'inset(0 0 0% 0)',
  //             ease: 'power4.out', duration: 2,
  //             scrollTrigger: {
  //                 trigger: imageRef.current,
  //                 start: 'top bottom',
  //             }
  //         })
  //         gsap.to(imageRef.current, {
  //             scale: 1,
  //             ease: 'power4.out', duration: 2,
  //             scrollTrigger: {
  //                 trigger: imageRef.current,
  //                 start: 'top bottom',
  //             }
  //         })
  //     }
  // }, [imageRef, wrapImage, isPageEnter])

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
              <FadeHeading stagger={0.2}>DER</FadeHeading>
              <FadeHeading stagger={0.2}>MOND</FadeHeading>
            </div>
            <div
              className={`${s.bottomHero_wrapImage} col-span-6 col-start-4`}
              ref={wrapImage}
            >
              <ImagePlaceholder
                src={'/images/src/heroImg.jpg'}
                alt={'image'}
                width={2668}
                height={3860}
              />
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
