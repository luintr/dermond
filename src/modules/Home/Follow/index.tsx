import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import bg from '@Images/follow.jpeg';
import SvgAnimate from './SvgAnimate';

const FollowSection = () => {
  return (
    <section className={s.followSection}>
      <Container className={s.container}>
        <div className={s.follow}>
          <h3 className={`${s.follow_title} ${cinzelFont.className}`}>
            follow us on instagram
          </h3>
          <p className={s.follow_content}>@DERMOND.VN</p>
        </div>
        <div className={s.parallaxBg}>
          <Image src={bg.src} width={bg.width} height={bg.height} alt="bg" />
        </div>
        <SvgAnimate />
      </Container>
    </section>
  );
};

export default FollowSection;
