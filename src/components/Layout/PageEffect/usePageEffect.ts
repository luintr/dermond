import useUiContext from '@/context/uiContext';
import { gsap } from 'gsap';
import { MutableRefObject, useEffect, useRef } from 'react';

interface ISusePageEffect {
  refContent: MutableRefObject<HTMLDivElement | null>;
}

export default function usePageEffect({ refContent }: ISusePageEffect): void {
  const { pageStatus, setPageStatus } = useUiContext();
  const refisWinload = useRef<boolean>(false);
  useEffect(() => {
    gsap.context(() => {
      if (pageStatus === 'PAGE_EXIT') {
        if (!refContent.current) return;
        refContent.current.style.pointerEvents = 'auto';
        refContent.current.style.visibility = 'visible';

        const itemExit = refContent.current.querySelectorAll('.js-item');
        gsap.fromTo(
          itemExit,
          { y: '100%' },
          {
            y: 0,
            ease: 'power3.inOut',
            duration: 0.6,
            stagger: 0.05,
            onComplete: () => {
              setPageStatus('PAGE_LEAVE');
            },
          }
        );
      } else if (pageStatus === 'PAGE_LOADED') {
        if (!refisWinload.current) {
          refisWinload.current = true;
          return;
        }
        if (!refContent.current) return;
        const itemExit = refContent.current.querySelectorAll('.js-item');
        gsap.to(itemExit, {
          y: '-100%',
          overwrite: 'auto',
          ease: 'power3.inOut',
          duration: 0.6,
          stagger: 0.05,
          onComplete: () => {
            if (!refContent.current) return;
            refContent.current.style.pointerEvents = 'none';
            refContent.current.style.visibility = 'hidden';
            setPageStatus('PAGE_ENTER');
          },
        });
      }
    }, [refContent]);
  }, [pageStatus, refContent, setPageStatus]);
}
