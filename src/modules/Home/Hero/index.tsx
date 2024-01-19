import React from 'react';
import s from './styles.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';

const HeroSection = () => {
  return (
    <section className={s.heroSection}>
      <Container className={s.heroSection_container}>
        <div className={`${s.topHero} grid grid-cols-12`}>
          <div className={`${s.topHero_left} col-span-2 col-start-2`}>
            <p>TAILOR SHOP BASED IN VIETNAM</p>
            <p>ETS 2019</p>
          </div>
          <div className={`${s.topHero_middle} col-span-2 col-start-6`}>
            <p>INSTAGRAM: @DERMOND.VN</p>
          </div>
          <div className={`${s.topHero_right} col-span-2 col-start-10`}>
            <p>HN 16:59</p>
            <p>19 DEC 2023</p>
          </div>
        </div>
        <div className={`${s.bottomHero} grid grid-cols-12`}>
          <div
            className={`${s.bottomHero_title} ${cinzelFont.className} col-span-6 col-start-4`}
          >
            <h2>DER</h2>
            <h2>MOND</h2>
          </div>
          <div
            className={`${s.bottomHero_wrapImage} col-span-6 col-start-4`}
          ></div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
