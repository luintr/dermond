import React from 'react';
import s from './styles.module.scss';
import { ArrowIcon } from '../Icons';
import LinkEffect from '../LinkEffect';

type IButtonNavigate = {
  text?: string;
  href?: string;
  className?: string;
};
const ButtonNavigate = ({ text, href, className }: IButtonNavigate) => {
  return (
    <LinkEffect href={href ? href : '#'} className={`${s.button} ${className}`}>
      {text}
      <span>
        <ArrowIcon />
      </span>
    </LinkEffect>
  );
};

export default ButtonNavigate;
