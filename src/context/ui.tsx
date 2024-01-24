'use client';

import useObHeightChange from '@Hooks/useObHeightChange';
import PageLoader from '@/components/Layout/PageLoader';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

type tPageStatus =
  | 'PAGE_ENTER'
  | 'PAGE_LOADED'
  | 'PAGE_LEAVE'
  | 'PAGE_EXIT'
  | 'PAGE_ONCE';
export type tHeaderColor = 'white' | 'green' | 'brow';

interface IUiContext {
  pageOnce: boolean;
  pageStatus: string;
  logoColor: string;
  scrollHeight: number;
  setLogoColor: React.Dispatch<SetStateAction<tHeaderColor>>;
  setPageStatus: React.Dispatch<SetStateAction<tPageStatus>>;
  setFramesLoaded: React.Dispatch<SetStateAction<boolean>>;
  isPageLeave: boolean;
  isPageEnter: boolean;
}
export const UiContext = createContext<IUiContext>({
  pageStatus: 'PAGE_ONCE',
  scrollHeight: 0,
  logoColor: 'white',
  setPageStatus: _ => null,
  setLogoColor: _ => null,
  setFramesLoaded: _ => null,
  pageOnce: false,
  isPageLeave: false,
  isPageEnter: false,
});

function scrollRestoration(): void {
  window.scrollTo(0, 0);
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
}

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pageStatus, setPageStatus] = useState<tPageStatus>('PAGE_ONCE');
  // const [isMenuSHow, setIsMenuShow] = useState<boolean>(false);
  const [pageOnce, setPageOnce] = useState(true);
  const { scrollHeight } = useObHeightChange();
  const [logoColor, setLogoColor] = useState<tHeaderColor>('white');
  const [_framesLoaded, setFramesLoaded] = useState<boolean>(false);
  const [isPageLeave, setIsPageLeave] = useState(false);
  const [isPageEnter, setIsPageEnter] = useState(false);

  const isLoaded = useMemo((): boolean => {
    return pageStatus === 'PAGE_LOADED';
  }, [pageStatus]);

  useEffect(() => {
    setIsPageLeave(pageStatus === 'PAGE_LOADED');
    setIsPageEnter(pageStatus === 'PAGE_ENTER');
  }, [pageStatus]);

  useEffect(() => {
    scrollRestoration();
    setPageOnce(true);
    setPageStatus('PAGE_LOADED');
  }, []);

  const onCompleteLoaded = useCallback(() => {
    setPageStatus('PAGE_ENTER');
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scrollHeight]);

  const contextValues = useMemo(() => {
    return {
      pageStatus,
      setPageStatus,
      scrollHeight,
      pageOnce,
      logoColor,
      setLogoColor,
      setFramesLoaded,
      isPageLeave,
      isPageEnter,
    };
  }, [
    pageStatus,
    pageOnce,
    setPageStatus,
    scrollHeight,
    logoColor,
    setLogoColor,
    setFramesLoaded,
    isPageLeave,
    isPageEnter,
  ]);

  return (
    <UiContext.Provider value={contextValues}>
      <PageLoader isLoaded={isLoaded} onCompleted={onCompleteLoaded} />
      {children}
    </UiContext.Provider>
  );
};

export default function useUiContext(): IUiContext {
  return useContext(UiContext);
}
