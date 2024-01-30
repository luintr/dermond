'use client';

import { LINE_LAYOUT_EFFECT } from '@Constants/animation';
import React, { useMemo, useRef } from 'react';

import usePageEffect from './usePageEffect';

import s from './style.module.scss';

export default function PageEffect(): React.ReactElement {
  const refContent = useRef(null);

  usePageEffect({ refContent });
  const listItems = useMemo(() => {
    return Array.from({ length: LINE_LAYOUT_EFFECT }, (_, index) => (
      <div key={index} className={`${s.transition_item} js-item`}></div>
    ));
  }, []);

  return (
    <div className={s.transition} ref={refContent}>
      {listItems.map(item => {
        return item;
      })}
    </div>
  );
}
