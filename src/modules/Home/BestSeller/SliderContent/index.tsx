import React, { useLayoutEffect, useRef } from 'react';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { HOME_BESTSELLER_DATA } from '@/constants/homeData/data';

import gsap from 'gsap';

type ISLiderContent = {
  className?: string;
  activeSlider: number;
};

const SliderContent: React.FC<ISLiderContent> = ({
  className,
  activeSlider,
}) => {
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      sliderRefs.current.forEach((item, index) => {
        if (index !== activeSlider) {
          gsap.to(titleRefs.current[index], {
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out',
          });
          gsap.to(contentRefs.current[index], {
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out',
          });
          gsap.to(titleRefs.current[index], {
            y: '30%',
            duration: 0.1,
            ease: 'power4.out',
            delay: 0.5,
          });
          gsap.to(contentRefs.current[index], {
            y: '40px',
            duration: 0.1,
            ease: 'power4.out',
            delay: 0.5,
          });
        } else {
          gsap.to(titleRefs.current[index], {
            opacity: 1,
            y: '0%',
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.3,
          });
          gsap.to(contentRefs.current[index], {
            opacity: 1,
            y: '0%',
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.5,
          });
        }
      });
    });
    return () => ctx.clear();
  }, [activeSlider]);

  return (
    <div className={`${s.sliderContent}, ${className}`}>
      {HOME_BESTSELLER_DATA.map((item, index) => (
        <div
          key={index}
          className={`${s.sliderContent_wrap} ${index === activeSlider ? s.active : null}`}
          ref={el => (sliderRefs.current[index] = el)}
        >
          <h3
            className={`${s.sliderContent_name} ${cinzelFont.className}`}
            ref={el => (titleRefs.current[index] = el)}
          >
            {item.name}
          </h3>
          <p
            className={`${s.sliderContent_content} `}
            ref={el => (contentRefs.current[index] = el)}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SliderContent;
