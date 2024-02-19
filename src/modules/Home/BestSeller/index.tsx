'use client';
import React, { useState } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import RoundedText from '../../../components/RoundedText';
import { SingleArrowIcon } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';
import { ROUTE_PATH } from '@/constants/route';
import { HOME_BESTSELLER_DATA } from '@/constants/homeData/data';
import Slider from './Slider';
const BestSellerSection = () => {
  const [activeSlider, setActiveSlider] = useState<number>(0);

  const prevClickHandler = () => {
    if (activeSlider === 0) {
      setActiveSlider(HOME_BESTSELLER_DATA.length - 1);
    } else {
      setActiveSlider(state => state - 1);
    }
  };

  const nextClickHandler = () => {
    if (activeSlider === HOME_BESTSELLER_DATA.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider(state => state + 1);
    }
  };

  // console.log(activeSlider);

  return (
    <section className={s.bestSellerSection}>
      <Container className={`${s.container} grid grid-cols-12`}>
        <div className={`${s.itemInfo} col-span-3 col-start-2`}>
          <div className={s.wrapContent}>
            <h3 className={`${s.itemInfo_title}`}>
              DER MOND’s <span>BEST SELLER</span>
            </h3>
            <div className={s.itemInfo_wrap}>
              <h3 className={`${s.itemInfo_name} ${cinzelFont.className}`}>
                SUEDE LEATHER BLAZER
              </h3>
              <p className={`${s.itemInfo_content} `}>
                Customization Beyond Boundaries: Design is personal, and so is
                our approach. We don&apos;t just design dresses; we craft
                experiences. From fabric selection to silhouette, we tailor
                every detail to match the individuality of our clients, ensuring
                a truly bespoke creation.
              </p>
            </div>
          </div>
          <LinkEffect href={ROUTE_PATH.STORY} className={s.roundedText}>
            <RoundedText />
          </LinkEffect>
          <p className={`${s.sliderNumber} ${cinzelFont.className}`}>/01</p>
        </div>
        <div className={`${s.itemSlider} col-span-6 col-start-6`}>
          <div
            className={`${s.itemSlider_btn} ${s.left}`}
            onClick={prevClickHandler}
          >
            <SingleArrowIcon />
          </div>
          <Slider activeSlider={activeSlider} className={s.itemSlider_slider} />
          <div
            className={`${s.itemSlider_btn} ${s.right}`}
            onClick={nextClickHandler}
          >
            <SingleArrowIcon />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BestSellerSection;
