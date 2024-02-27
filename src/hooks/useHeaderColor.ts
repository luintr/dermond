'use client';

import { useHeaderColorStore } from '@/store/zustandStore';
import { tHeaderColor } from '@/types/common';
import { useEffect } from 'react';

export default function useHeaderColor(color: tHeaderColor): void {
  const { setHeaderColor } = useHeaderColorStore();
  useEffect(() => {
    setHeaderColor(color);
  }, [setHeaderColor, color]);
}
