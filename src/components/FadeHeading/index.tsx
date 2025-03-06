'use client';

import { useHeadlineFade } from './useHeadlineFade';
import React, { PropsWithChildren, useMemo, useRef } from 'react';
import s from './style.module.scss';

interface IFadeHeading extends PropsWithChildren {
  className?: string;
  stagger?: number;
}

export default function FadeHeading({
  children,
  className,
  stagger,
}: IFadeHeading) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const memoFade = useMemo(() => {
    return {
      ref: titleRef,
      stagger,
    };
  }, [stagger]);

  useHeadlineFade(memoFade);

  return (
    <h2 ref={titleRef} className={`${s.title} ${className || ''}`}>
      {children}
    </h2>
  );
}
