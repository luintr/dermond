'use client';

import useBoxParallax from './useBoxParallax';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

import s from './style.module.scss';

interface IBoxParallax extends PropsWithChildren {
  className?: string;
  offset?: number;
  isObserver?: boolean;
  isAnimation?: boolean;
  delayEnter?: number;
  delayTrigger?: number;
}

export default function BoxParallax({
  children,
  className,
  offset,
  isAnimation,
  delayEnter,
  delayTrigger,
  isObserver,
}: IBoxParallax): React.ReactElement {
  const refWrap = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLDivElement | null>(null);
  const refObserver = useRef<IntersectionObserver | null>(null);
  useBoxParallax({ refWrap, refContent, offset: offset || 0.15 });

  useEffect(() => {
    if (!isAnimation) return;
    const gc = gsap.context(() => {
      gsap.set(refContent.current, {
        '--clipPath': ' inset(100% 0% 0% 0%)',
        scale: 1.25,
      });
    }, [refContent]);

    return () => gc.revert();
  }, [isAnimation]);

  return (
    <div className={`${s.boxParallax} ${className}`} ref={refWrap}>
      <div className={s.boxParallax_inner} ref={refContent}>
        {children}
      </div>
    </div>
  );
}
