import { MutableRefObject, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import useSplitType from '@Hooks/useSplitType';
import useUiContext from '@/context/uiContext';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

interface IHeadlineFade {
  ref: MutableRefObject<HTMLElement | null>;
  stagger?: number;
  isObserver?: boolean;
}

export function useHeadlineFade({ ref, stagger = 0.01, isObserver = true }: IHeadlineFade): void {
  const splitTextRef = useSplitType(ref, { types: 'words, chars' });
  const { isPageEnter } = useUiContext();

  const memoFade = useMemo(() => {
    return { ref, stagger, isObserver };
  }, [ref, stagger, isObserver]);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const chars = splitTextRef.current?.chars as HTMLElement[];

      if (!chars) return;

      gsap.set(chars, { opacity: 0 });

      const animationIn = () => {
        gsap.to(chars, {
          opacity: 1,
          stagger: {
            from: 'random',
            each: stagger,
          },
          ease: 'power4.inOut',
        });
      };

      if (!isObserver) {
        isPageEnter && animationIn();
      } else {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            animationIn();
            ref.current && observer.unobserve(ref.current);
            observer.disconnect();
          }
        });

        ref.current && observer.observe(ref.current);
      }
    }, [ref]);

    return () => gsapContext.revert();
  }, [memoFade, isPageEnter, splitTextRef]);
}
