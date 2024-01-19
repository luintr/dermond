import React from 'react';
import s from './style.module.scss';
import HeroSection from './Hero';
import CollectionSecion from './Collection';
import BestSellerSection from './BestSeller';
import SeasonSection from './Season';
import FollowSection from './Follow';

const HomeModule = (): React.ReactElement => {
  return (
    <div className={s.hompage}>
      <HeroSection />
      <CollectionSecion />
      <BestSellerSection />
      <SeasonSection />
      <FollowSection />
    </div>
  );
};

export default HomeModule;
