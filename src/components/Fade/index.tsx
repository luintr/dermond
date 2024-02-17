'use client';

import useFade from './useFade';
import React, { PropsWithChildren, useMemo, useRef } from 'react';

import { IAnimationElement } from '@/types/common';

interface IFade extends PropsWithChildren {
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  delayTrigger?: number;
  duration?: number;
  delayEnter?: number;
  from?: string;
  isObserver?: boolean;
}

export default function Fade({
  direction = 'none',
  delayTrigger,
  delayEnter,
  children,
  duration,
  from,
  isObserver,
}: IFade): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const memoFade = useMemo(() => {
    return {
      refContent,
      delayTrigger,
      delayEnter,
      direction,
      duration,
      from,
      isObserver,
    };
  }, [
    refContent,
    delayTrigger,
    delayEnter,
    direction,
    duration,
    from,
    isObserver,
  ]);
  useFade(memoFade);
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
