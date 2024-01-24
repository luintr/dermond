'use client';

import React from 'react';
import s from './style.module.scss';
import StoryHero from './StoryHero';
import StoryTabs from './StoryTabs';
import StoryWork from './StoryWork';
import StoryService from './StoryService';
import StoryShop from './StoryShop';

const StoryModule = () => {
  return (
    <div className={s.storyModule}>
      <StoryHero />
      <StoryTabs />
      <StoryWork />
      <StoryService />
      <StoryShop />
    </div>
  );
};

export default StoryModule;
