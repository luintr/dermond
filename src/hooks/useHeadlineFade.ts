import { MutableRefObject, useEffect } from 'react';
import useSplitType from './useSplitType';
import gsap from 'gsap';

type IHeadlineFade = {
  ref: MutableRefObject<
    HTMLHeadingElement | HTMLHeadElement | HTMLElement | null
  >;
  stagger?: number;
};

export const useHeadlineFade = ({
  ref,
  stagger = 0.025,
}: IHeadlineFade): void => {
  const splitTextRef = useSplitType(ref, { types: 'words, chars' });

  useEffect(() => {
    const chars = splitTextRef.current?.chars as HTMLElement[];

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateFadeIn();
        // @ts-ignore
        observer.unobserve(ref.current);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    const animateFadeIn = () => {
      gsap.fromTo(
        chars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: {
            from: 'random',
            each: stagger,
          },
          ease: 'power4.inOut',
        }
      );
    };

    return () => {
      observer.disconnect();
    };
  }, [splitTextRef, stagger, ref]);
};
