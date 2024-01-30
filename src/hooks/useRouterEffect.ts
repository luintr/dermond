import useUiContext from '@/context/ui';
import { TIME_DELAY_ROUTING } from '@Constants/animation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useRouterEffect(): { routerEffect: (r: string) => void } {
  const router = useRouter();

  const { pageStatus, setPageStatus } = useUiContext();
  const [url, setUrl] = useState<string | null>(null);
  const routerEffect = (url: string): void => {
    setPageStatus('PAGE_EXIT');
    setUrl(url);
  };

  useEffect(() => {
    if (!url) return;
    if (pageStatus === 'PAGE_LEAVE') {
      router.push(url);
      fetch(url).then(() => {
        setUrl(null);
        window.scrollTo(0, 0);
        setTimeout(() => setPageStatus('PAGE_LOADED'), TIME_DELAY_ROUTING);
      });
    }
  }, [pageStatus, router, setPageStatus, url]);

  return { routerEffect };
}
