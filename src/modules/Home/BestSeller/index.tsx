'use client';
import React, { useCallback, useState } from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
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

  const prevClickHandler = useCallback(() => {
    setDisableClick(true);
    if (activeSlider === 0) {
      setActiveSlider(HOME_BESTSELLER_DATA.length - 1);
    } else {
      setActiveSlider(state => state - 1);
    }
    setTimeout(() => {
      setDisableClick(false);
    }, 1500);
  }, [activeSlider]);

  const nextClickHandler = useCallback(() => {
    setDisableClick(true);
    if (activeSlider === HOME_BESTSELLER_DATA.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider(state => state + 1);
    }
    setTimeout(() => {
      setDisableClick(false);
    }, 1500);
  }, [activeSlider]);

  return (
    <section className={s.bestSellerSection}>
      <Container className={`${s.container} grid grid-cols-12 relative`}>
        <div className={`${s.itemInfo} col-span-12 col-start-1 sm:col-span-4`}>
          <div className={s.wrapContent}>
            <SliderNumber activeSlider={activeSlider} />
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
        </div>
        <div
          className={`${s.itemSlider} col-span-12 col-start-1 sm:col-span-8 sm:col-start-5`}
        >
          <button
            className={`${s.itemSlider_btn} ${disableClick && s.disable}`}
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
