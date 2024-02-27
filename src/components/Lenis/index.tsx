'use client';
import useUiContext from '@/context/uiContext';
import { useModelStore } from '@/store/zustandStore';

import Lenis from '@studio-freight/lenis';
import { ReactLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({
  children,
}: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<Lenis>();
  const { pageStatus } = useUiContext();
  const { modelState } = useModelStore();

  useEffect(() => {
    lenisRef.current?.stop();
  }, []);

  useEffect(() => {
    if (modelState) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [modelState]);

  useEffect(() => {
    if (pageStatus === 'PAGE_ENTER') {
      lenisRef.current?.start();
    } else {
      lenisRef.current?.stop();
    }
  }, [pageStatus]);

  useEffect(() => {
    function update(time: number): void {
      lenisRef.current?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} normalizeWheel>
      {children}
    </ReactLenis>
  );
}
