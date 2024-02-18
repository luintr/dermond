import { MutableRefObject, useEffect } from 'react';
import useSplitType from './useSplitType';
import gsap from 'gsap';

type IHeadlineFade = {
  headline: MutableRefObject<HTMLHeadingElement | null>;
  duration?: number;
};

export const useHeadlineFade = ({
  headline,
  duration = 0.025,
}: IHeadlineFade): void => {
  const splitTextRef = useSplitType(headline, { types: 'words, chars' });

  useEffect(() => {
    const chars = splitTextRef.current?.chars as HTMLElement[];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: {
            from: 'random',
            each: duration,
          },
          ease: 'power4.inOut',
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [splitTextRef]);
};
