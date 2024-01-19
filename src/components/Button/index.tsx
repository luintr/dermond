import Link from 'next/link';
import React from 'react';
import s from './styles.module.scss';
import { ArrowIcon } from '../Icons';

type IButtonNavigate = {
  text?: string;
  href?: string;
  className?: string;
};
const ButtonNavigate = ({ text, href, className }: IButtonNavigate) => {
  return (
    <Link href={href ? href : '#'} className={`${s.button} ${className}`}>
      {text}
      <span>
        <ArrowIcon />
      </span>
    </Link>
  );
};

export default ButtonNavigate;
