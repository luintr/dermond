import { marqueeItems } from '@/constants/utils';
import { useGSAP } from '@gsap/react';
import { RefObject, useRef } from 'react';
import gsap from 'gsap';

type IMarquee = {
  marqueeInner: RefObject<HTMLDivElement>;
};

const useMarquee = ({ marqueeInner }: IMarquee) => {
  const marqueePartRefs = marqueeItems.map(() =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLSpanElement | null>(null)
  );

  useGSAP(() => {
    marqueePartRefs.map((item: React.MutableRefObject<HTMLElement | null>) => {
      gsap
        .to(item.current, {
          yPercent: -100,
          repeat: -1,
          duration: 5,
          ease: 'none',
        })
        .totalProgress(0.5);
    });
    gsap.set(marqueeInner.current, { yPercent: -50 });
  });

  return {
    marqueePartRefs,
  };
};

export default useMarquee;
