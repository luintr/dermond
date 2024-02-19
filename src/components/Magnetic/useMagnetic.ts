import { gsap } from 'gsap';
import { MutableRefObject, useEffect } from 'react';
import { IAnimationElement } from '@/types/common';

interface IUseMagnetic {
  refContent: MutableRefObject<IAnimationElement | null>;
  isObserver?: boolean;
}

export default function useMagnetic({
  refContent,
  isObserver,
}: IUseMagnetic): void {
  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const xTo = gsap.quickTo(refContent.current, 'x', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      const yTo = gsap.quickTo(refContent.current, 'y', {
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });

      const refContentCurrent = refContent.current as HTMLElement;

      refContentCurrent.addEventListener('mousemove', (e: any) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } =
          refContentCurrent.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      });
      refContentCurrent.addEventListener('mouseleave', e => {
        xTo(0);
        yTo(0);
      });
    }, [refContent]);

    return () => gsapContext.revert();
  }, [refContent, isObserver]);
}
