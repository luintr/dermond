import React, { useRef } from 'react';
import s from './style.module.scss';
import Image from 'next/image';
import { HOME_BESTSELLER_DATA } from '@/constants/homeData/data';
import { useGSAP } from '@gsap/react';

type ISLider = {
  className?: string;
  activeSlider: number;
};

const Slider: React.FC<ISLider> = ({ className, activeSlider }) => {
  const triggerEl = useRef<HTMLDivElement | null>(null);
  const sellerItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  console.log(sellerItemRefs);

  useGSAP(() => {}, [sellerItemRefs, activeSlider]);

  return (
    <div className={`${s.sellerSlider} ${className}`} ref={triggerEl}>
      {HOME_BESTSELLER_DATA.map((item, index) => (
        <div
          key={index}
          className={`${s.sellerSlider_item} ${index === activeSlider && s.active}`}
          ref={element => (sellerItemRefs.current[index] = element)}
        >
          <Image
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            alt="img"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
