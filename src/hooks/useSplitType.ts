import { useEffect, useRef } from 'react';
import SplitType from 'split-type';

function useSplitType(targetRef: any, options: Object) {
  const splitTextRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (targetRef.current) {
      splitTextRef.current = new SplitType(targetRef.current, options);
    }
  }, [targetRef, options]);

  return splitTextRef;
}

export default useSplitType;
