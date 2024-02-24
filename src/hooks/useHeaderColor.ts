'use client';

import useUiContext, { tHeaderColor } from '@Context/uiContext';
import { useEffect } from 'react';

export default function useHeaderColor(color: tHeaderColor): void {
  const { setHeaderColor } = useUiContext();
  useEffect(() => {
    setHeaderColor(color);
  }, [setHeaderColor, color]);
}
