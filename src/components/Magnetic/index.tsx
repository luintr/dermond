'use client';

import React, { useRef } from 'react';
import { IAnimationElement } from '@/types/common';
import useMagnetic from './useMagnetic';

export default function Magnetic({
  children,
}: {
  children: React.ReactNode;
  isObserver?: boolean;
}): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  useMagnetic({
    refContent,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
