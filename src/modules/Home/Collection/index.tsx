'use client';

import React, { useRef } from 'react';
import s from './style.module.scss';
import Container from '@Components/Container';
import { cinzelFont, playfairFont } from '@/utils/fonts';
import Image from 'next/image';
import { HOME_COLLECTION_DATA } from '@/constants/homeData/data';
import MarqueeText from '@/modules/Home/Collection/MarqueeText';
import BoxParallax from '@/components/BoxParallax';
import Fade from '@/components/Fade';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FadeHeading from '@/components/FadeHeading';

const CollectionSecion = () => {
  const line = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(line.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ease: 'power4.out',
      duration: 1.3,
      scrollTrigger: {
        trigger: line.current,
        start: 'top 80%',
        end: 'bottom center',
      },
    });
  });
  return (
    <section className={s.collectionSection}>
      <Container className={s.container}>
        <div className={`${s.introduce} grid grid-cols-12`}>
          <FadeHeading
            className={`${s.introduce_title} ${cinzelFont.className} col-span-6 col-start-2`}
            stagger={0.03}
          >
            MINIMALIST STRONG FOR <span>COLLECTION</span>
          </FadeHeading>
          <div
            className={`${s.introduce_desc} col-span-4 col-start-8 grid grid-cols-4`}
          >
            <div className={`${s.line} col-span-4`} ref={line}></div>
            <div className={`${s.wrapText} col-span-3 col-start-2`}>
              <Fade direction={'bottom'} from={'30px'} delayTrigger={0.3}>
                <p>
                  Emphasize{' '}
                  <span className={playfairFont.className}>DER MOND</span>
                  &apos;s specialization in creating unique, one-of-a-kind prom
                  dresses tailored to each client&apos;s individual style and
                  preferences.
                </p>
              </Fade>
            </div>
          </div>
        </div>

        <div className={s.collection}>
          {HOME_COLLECTION_DATA.map((item, index) => (
            <div key={index} className={s.wrapImage}>
              <BoxParallax offset={item.offset}>
                <Image
                  className={`${s.collection_img}`}
                  src={item.image}
                  width={item.width}
                  height={item.height}
                  alt="image"
                />
              </BoxParallax>
            </div>
          ))}
        </div>
      </Container>
      <MarqueeText />
    </section>
  );
};

export default CollectionSecion;
