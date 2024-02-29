import React, { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

interface IInfiniteScroll extends PropsWithChildren {
  loader: ReactNode;
  fetchMore: () => void;
  hasMore: boolean;
  endMessage: ReactNode;
  className: string;
}

const InfiniteScroll = ({
  children,
  loader,
  fetchMore,
  hasMore,
  endMessage,
  className,
}: IInfiniteScroll): React.ReactElement => {
  const pageEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          // kiểm tra element có nằm trong viewport không?
          fetchMore();
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);
  return (
    <div className={className}>
      {children}

      {hasMore ? (
        <div className="col-span-2 col-start-6" ref={pageEndRef}>
          {loader}
        </div>
      ) : (
        endMessage
      )}
    </div>
  );
};

export default InfiniteScroll;
