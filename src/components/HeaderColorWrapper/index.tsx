'use client';

import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import useUiContext from '@Context/uiContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

interface Props extends PropsWithChildren {
  headerColor: 'light' | 'dark';
  colorBefore?: 'light' | 'dark';
  children?: ReactNode;
}

const HeaderColorWrapper = ({
  headerColor,
  colorBefore,
  children,
}: Props): ReactElement => {
  const { setHeaderColor } = useUiContext();
  const refTrigger = useRef<HTMLDivElement>(null);
  const { isPageEnter } = useUiContext();

  useScrollTrigger(
    {
      trigger: refTrigger,
      start: 'top top',
      end: 'bottom top',
      onToggle: self => {
        if (self.isActive) {
          setHeaderColor(headerColor);
        }
      },
      onLeaveBack: () => {
        if (colorBefore) {
          setHeaderColor(colorBefore);
        }
      },
    },
    [headerColor, colorBefore, setHeaderColor, isPageEnter]
  );

  return <div ref={refTrigger}>{children}</div>;
};

export default HeaderColorWrapper;
