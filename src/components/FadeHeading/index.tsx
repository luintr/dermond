'use client';
import { useHeadlineFade } from '@/hooks/useHeadlineFade';
import React, { PropsWithChildren, useRef } from 'react';
import s from './style.module.scss';

type IFadeHeading = {
  className?: string;
  stagger?: number;
};

const FadeHeading: React.FC<PropsWithChildren<IFadeHeading>> = ({
  children,
  className,
  stagger,
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  useHeadlineFade({ ref: titleRef, stagger: stagger });

  return (
    <h2 className={`${s.title} ${className}`} ref={titleRef}>
      {children}
    </h2>
  );
};

export default FadeHeading;
