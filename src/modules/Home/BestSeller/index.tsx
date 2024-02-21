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
import SliderContent from './SliderContent';
import SliderNumber from './SliderNumber';
const BestSellerSection = () => {
  const [activeSlider, setActiveSlider] = useState<number>(0);
  const [disableClick, setDisableClick] = useState<boolean>(false);

  const prevClickHandler = () => {
    setDisableClick(true);
    if (activeSlider === 0) {
      setActiveSlider(HOME_BESTSELLER_DATA.length - 1);
    } else {
      setActiveSlider(state => state - 1);
    }
    setTimeout(() => {
      setDisableClick(false);
    }, 1000);
  };

  const nextClickHandler = () => {
    setDisableClick(true);
    if (activeSlider === HOME_BESTSELLER_DATA.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider(state => state + 1);
    }
    setTimeout(() => {
      setDisableClick(false);
    }, 1000);
  };

  return (
    <section className={s.bestSellerSection}>
      <Container className={`${s.container} grid grid-cols-12`}>
        <div className={`${s.itemInfo} col-span-3 col-start-2`}>
          <div className={s.wrapContent}>
            <h3 className={`${s.itemInfo_title}`}>
              DER MOND’s <span>BEST SELLER</span>
            </h3>
            <SliderContent
              activeSlider={activeSlider}
              className={s.itemSlider_slider}
            />
          </div>
          <LinkEffect href={ROUTE_PATH.STORY} className={s.roundedText}>
            <RoundedText />
          </LinkEffect>
          <SliderNumber activeSlider={activeSlider} />
        </div>
        <div className={`${s.itemSlider} col-span-6 col-start-6`}>
          <button
            className={`${s.itemSlider_btn} ${s.left} ${disableClick && s.disable}`}
            onClick={prevClickHandler}
            disabled={disableClick}
          >
            <SingleArrowIcon />
          </button>
          <Slider activeSlider={activeSlider} className={s.itemSlider_slider} />
          <button
            className={`${s.itemSlider_btn} ${s.right} ${disableClick && s.disable}`}
            onClick={nextClickHandler}
            disabled={disableClick}
          >
            <SingleArrowIcon />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default BestSellerSection;
