import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { HOME_BESTSELLER_DATA } from '@/constants/homeData/data';
import gsap from 'gsap';

type ISliderNumber = {
  activeSlider: number;
};

const SliderNumber: React.FC<ISliderNumber> = ({ activeSlider }) => {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      numRefs.current.forEach((item, index) => {
        if (index !== activeSlider) {
          gsap.to(item, {
            y: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
          });
        } else {
          gsap.to(item, {
            y: '0%',
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
          });
        }
      });
    });

    return () => gsapCtx.clear();
  }, [activeSlider]);

  return (
    <p className={`${s.sliderNumber} ${cinzelFont.className}`}>
      /0
      {HOME_BESTSELLER_DATA.map((item, index) => (
        <span
          key={index}
          className={`${s.num} ${index === activeSlider ? s.active : null}`}
          ref={el => (numRefs.current[index] = el)}
        >
          {item.id}
        </span>
      ))}
    </p>
  );
};

export default SliderNumber;
