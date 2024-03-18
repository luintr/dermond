'use client';
import React, { useLayoutEffect, useRef } from 'react';
import s from './style.module.scss';
import { playfairFont } from '@/utils/fonts';
import BoxParallax from '@/components/BoxParallax';
import Fade from '@/components/Fade';
import gsap from 'gsap';
import useUiContext from '@/context/uiContext';
import Container from '@/components/Container';
import useWindowResize from '@/hooks/useWindowSize';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const ShopHero = () => {
  const verRef = useRef<HTMLDivElement | null>(null);
  const horRef = useRef<HTMLDivElement | null>(null);
  const { isPageEnter } = useUiContext();
  const { isMobile } = useWindowResize();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isPageEnter) {
        gsap.to(verRef.current, {
          height: '100%',
          duration: 3,
          ease: 'power4.out',
        });
        gsap.to(horRef.current, {
          width: '100%',
          duration: 3,
          ease: 'power4.out',
        });
      }
    });
    return () => ctx.clear();
  });

  return (
    <section className={`${s.shopHero} `}>
      <div className={s.shopHero_img}>
        <BoxParallax>
          <ImagePlaceholder
            src={'/images/src/shopHero.jpg'}
            alt={'image'}
            width={1000}
            height={1000}
          />
        </BoxParallax>
      </div>
      <div className={`${s.shopHero_content}`}>
        <Container
          className={`${s.container} grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12`}
        >
          <div
            className={`${s.wrapContent} col-span-4 sm:col-span-6 md:col-start-2`}
          >
            <div className={s.verticalLine} ref={verRef}></div>
            <div className={s.horizontalLine} ref={horRef}></div>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.25}>
              <h2 className={`${s.shopHero_title} ${playfairFont.className}`}>
                TIS THE SEASON 50% SALE OFF
              </h2>
            </Fade>

            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p className={`${s.shopHero_desc}`}>
                The list of products sold at &quot;better prices&quot; is only
                sold online - Online Only. They have been making waves for a
                while and are currently in a situation where sizes and numbers
                are out of stock.
              </p>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p className={s.shopHero_link}>@dermond.vn</p>
            </Fade>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ShopHero;
