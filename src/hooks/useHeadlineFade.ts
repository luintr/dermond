import { MutableRefObject, useEffect } from 'react';
import useSplitType from './useSplitType';
import gsap from 'gsap';
import useUiContext from '@/context/uiContext';

type IHeadlineFade = {
  ref: MutableRefObject<
    HTMLHeadingElement | HTMLHeadElement | HTMLElement | null
  >;
  stagger?: number;
};

export const useHeadlineFade = ({
  ref,
  stagger = 0.015,
}: IHeadlineFade): void => {
  const splitTextRef = useSplitType(ref, { types: 'words, chars' });
  const { isPageEnter } = useUiContext();

  useEffect(() => {
    const chars = splitTextRef.current?.chars as HTMLElement[];

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        isPageEnter && animateFadeIn();
        // @ts-ignore
        observer.unobserve(ref.current);
      }
    });

    isPageEnter && ref.current && observer.observe(ref.current);

    const animateFadeIn = () => {
      gsap.to(chars, {
        opacity: 1,
        stagger: {
          from: 'random',
          each: stagger,
        },
        ease: 'power4.inOut',
      });
    };

    return () => {
      observer.disconnect();
    };
  }, [splitTextRef, stagger, ref, isPageEnter]);
};
