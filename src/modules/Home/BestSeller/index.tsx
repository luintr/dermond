import React from 'react';
import s from './style.module.scss';
import Container from '@/components/Container';
import { cinzelFont } from '@/utils/fonts';
import RoundedText from '../../../components/RoundedText';
import { SingleArrowIcon } from '@/components/Icons';
import Image from 'next/image';
import example from '@Images/bestSellerImg.jpeg';

const BestSellerSection = () => {
  return (
    <section className={s.bestSellerSection}>
      <Container className={`${s.container} grid grid-cols-12`}>
        <div className={`${s.itemInfo} col-span-4 col-start-1`}>
          <div className={s.wrapContent}>
            <h3 className={`${s.itemInfo_title}`}>
              DER MOND’s <span>BEST SELLER</span>
            </h3>
            <h3 className={`${s.itemInfo_name} ${cinzelFont.className}`}>
              SUEDE LEATHER BLAZER
            </h3>
            <p className={`${s.itemInfo_content} `}>
              Customization Beyond Boundaries: Design is personal, and so is our
              approach. We don&apos;t just design dresses; we craft experiences.
              From fabric selection to silhouette, we tailor every detail to
              match the individuality of our clients, ensuring a truly bespoke
              creation.
            </p>
          </div>
          <RoundedText className={s.roundedText} />
          <p className={`${s.sliderNumber} ${cinzelFont.className}`}>/01</p>
        </div>
        <div className={`${s.itemSlider} col-span-8 col-start-5`}>
          <div className={`${s.itemSlider_btn} ${s.left}`}>
            <SingleArrowIcon />
          </div>
          <div className={s.itemSlider_slider}>
            <div className={s.wrapImg}>
              <Image
                src={example.src}
                width={example.width}
                height={example.height}
                alt="img"
              />
            </div>
          </div>
          <div className={`${s.itemSlider_btn} ${s.right}`}>
            <SingleArrowIcon />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BestSellerSection;
