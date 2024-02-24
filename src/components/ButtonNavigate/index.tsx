import React, { Ref } from 'react';
import s from './styles.module.scss';
import { ArrowIcon } from '../Icons';
import LinkEffect from '../LinkEffect';

type IButtonNavigate = {
  text?: string;
  href?: string;
  className?: string;
};
const ButtonNavigate = React.forwardRef(
  (
    { text, href, className }: IButtonNavigate,
    ref: Ref<HTMLAnchorElement> | undefined
  ) => {
    return (
      <LinkEffect
        ref={ref}
        href={href ? href : '#'}
        className={`${s.button} ${className}`}
      >
        {text}
        <span>
          <ArrowIcon />
        </span>
      </LinkEffect>
    );
  }
);

ButtonNavigate.displayName = 'ButtonNavigate';
export default ButtonNavigate;
