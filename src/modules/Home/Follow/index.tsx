import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import SvgAnimate from './SvgAnimate';
import BoxParallax from '@/components/BoxParallax';
import Fade from '@/components/Fade';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const FollowSection = () => {
  return (
    <section className={s.followSection}>
      <Container className={s.container}>
        <div className={s.follow}>
          <Fade direction={'bottom'} from={'30px'} delayTrigger={0.4}>
            <h3 className={`${s.follow_title} ${cinzelFont.className}`}>
              follow us on instagram
            </h3>
          </Fade>
          <Fade direction={'bottom'} from={'50px'} delayEnter={0.6}>
            <Link
              href="https://www.instagram.com/dermond.vn/"
              target="_blank"
              className={'relative z-10'}
            >
              <p className={s.follow_content}>@DERMOND.VN</p>
            </Link>
          </Fade>
        </div>
        <SvgAnimate />
      </Container>
      <div className={s.parallaxBg}>
        <BoxParallax offset={0.15}>
          <ImagePlaceholder
            src={'/images/src/follow.jpeg'}
            alt={'image'}
            width={3840}
            height={800}
          />
        </BoxParallax>
      </div>
    </section>
  );
};

export default FollowSection;
