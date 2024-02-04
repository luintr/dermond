'use client';
import { useModelStore } from '@/store/zustandStore';
import useRouterEffect from '@Hooks/useRouterEffect';
import Link from 'next/link';
import React, { PropsWithChildren, Ref } from 'react';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}
const LinkEffect = React.forwardRef(
  (
    { href, className, target, children, ...setProps }: Props,
    ref: Ref<HTMLAnchorElement> | undefined
  ): React.ReactElement => {
  const { setModelHide } = useModelStore();
    const { routerEffect } = useRouterEffect();
    return (
      <Link
        {...setProps}
        ref={ref}
        href={href}
        target={target}
        className={className}
        onClick={(e): void => {
          routerEffect(href);
          e.preventDefault();
          setModelHide();
        }}
        passHref
      >
        {children}
      </Link>
    );
  }
);

LinkEffect.displayName = 'LinkEffect';
export default LinkEffect;
