'use client';
import useRouterEffect from '@Hooks/useRouterEffect';
import Link from 'next/link';
import React, { PropsWithChildren, Ref } from 'react';

interface Props extends PropsWithChildren {
  href: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}
const LinEffect = React.forwardRef(
  (
    { href, className, target, children, ...setProps }: Props,
    ref: Ref<HTMLAnchorElement> | undefined
  ): React.ReactElement => {
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
        }}
        passHref
      >
        {children}
      </Link>
    );
  }
);

LinEffect.displayName = 'LinEffect';
export default LinEffect;
