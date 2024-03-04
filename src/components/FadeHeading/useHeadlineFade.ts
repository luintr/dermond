import { MutableRefObject, useEffect } from 'react';
import useSplitType from '@Hooks/useSplitType';
import gsap from 'gsap';
import useUiContext from '@/context/uiContext';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

type IHeadlineFade = {
  ref: MutableRefObject<
    HTMLHeadingElement | HTMLHeadElement | HTMLElement | null
  >;
  stagger?: number;
};

export const useHeadlineFade = ({
  ref,
  stagger = 0.01,
}: IHeadlineFade): void => {
  const splitTextRef = useSplitType(ref, { types: 'words, chars' });
  const { isPageEnter } = useUiContext();

  useScrollTrigger(
    {
      trigger: ref,
      start: 'top 90%',
      onEnter: () => {
        const chars = splitTextRef.current?.chars as HTMLElement[];

        isPageEnter &&
          gsap.to(chars, {
            opacity: 1,
            stagger: {
              from: 'random',
              each: stagger,
            },
            ease: 'power4.inOut',
          });
      },
    },
    [splitTextRef, stagger, ref, isPageEnter]
  );
};
