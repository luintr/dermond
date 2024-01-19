import React from 'react';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import image from '@Images/marqueeImg.png';

const MarqueeText = () => {
  return (
    <div className={`${s.textMarquee} ${cinzelFont.className}`}>
      <Marquee speed={60} gradient={false}>
        <div className={`${s.textMarquee_text} ${s.text1}`}>
          <span>VINTAGE</span>
          <span className={s.img}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={'image'}
            />
          </span>
          <span>TIMELESS BEAUTY</span>
          <span>ETERNITY</span>
          <span>Streamlined and luxurious</span>
        </div>
        <div className={`${s.textMarquee_text} ${s.text2}`}>
          <span>VINTAGE</span>
          <span className={s.img}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={'image'}
            />
          </span>
          <span>TIMELESS BEAUTY</span>
          <span>ETERNITY</span>
          <span>Streamlined and luxurious</span>
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeText;
