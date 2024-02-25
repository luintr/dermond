'use client';

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

  useEffect(() => {
    const gc = gsap.context(() => {
      ScrollTrigger.create({
        trigger: refTrigger.current,
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
      });
    }, [refTrigger]);
    return () => gc.revert();
  }, [headerColor, colorBefore, setHeaderColor, isPageEnter]);

  return <div ref={refTrigger}>{children}</div>;
};

export default HeaderColorWrapper;
