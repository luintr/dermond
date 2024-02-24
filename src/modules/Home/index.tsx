import React from 'react';
import s from './style.module.scss';
import HeroSection from './Hero';
import CollectionSecion from './Collection';
import BestSellerSection from './BestSeller';
import SeasonSection from './Season';
import FollowSection from './Follow';
import HeaderColorWrapper from '@/components/HeaderColorWrapper';

const HomeModule = (): React.ReactElement => {
  return (
    <div className={s.hompage}>
      <HeroSection />
      <CollectionSecion />
      <HeaderColorWrapper headerColor="light" colorBefore="dark">
        <BestSellerSection />
      </HeaderColorWrapper>
      <HeaderColorWrapper headerColor="dark" colorBefore="light">
        <SeasonSection />
      </HeaderColorWrapper>
      <FollowSection />
    </div>
  );
};

export default HomeModule;
