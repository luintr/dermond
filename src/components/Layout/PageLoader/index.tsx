import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import s from './styles.module.scss';

interface IPageLoader {
  isLoaded: boolean;
  onCompleted: () => void;
}

export default function PageLoader({
  isLoaded,
  onCompleted,
}: IPageLoader): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gc = gsap.context(() => {
      if (isLoaded && refContent.current) {
        gsap.to(refContent.current, {
          opacity: 0,
          ease: 'power4.inOut',
          duration: 2,
          onComplete: () => {
            onCompleted();
            refContent.current?.remove();
          },
        });
      }
    }, [refContent]);

    return () => gc.revert();
  }, [isLoaded, onCompleted]);
  return (
    <div className={s.pageLoader} ref={refContent}>
      Loading
    </div>
  );
}
