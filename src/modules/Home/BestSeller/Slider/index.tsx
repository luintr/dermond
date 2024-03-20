import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import Image from 'next/image';
import { HOME_BESTSELLER_DATA } from '@/constants/homeData/data';
import gsap from 'gsap';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type ISLider = {
  className?: string;
  activeSlider: number;
};

const Slider: React.FC<ISLider> = ({ className, activeSlider }) => {
  const sellerItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sellerItemRefs.current.forEach((item, index) => {
        if (index !== activeSlider) {
          gsap.to(item, {
            duration: 0.75,
            scale: 1.05,
            opacity: 0,
            ease: 'power4.out',
          });
        } else {
          gsap.to(item, {
            duration: 1.2,
            scale: 1,
            opacity: 1,
            ease: 'power4.out',
          });
        }
      });
    });

    return () => ctx.clear();
  }, [sellerItemRefs, activeSlider]);

  return (
    <div className={`${s.sellerSlider} ${className}`}>
      {HOME_BESTSELLER_DATA.map((item, index) => (
        <div
          key={index}
          className={`${s.sellerSlider_item} ${index === activeSlider && s.active}`}
          ref={element => (sellerItemRefs.current[index] = element)}
        >
          <ImagePlaceholder
            src={item.image}
            alt={'image'}
            width={1000}
            height={1000}
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
