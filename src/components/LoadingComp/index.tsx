import s from './style.module.scss';
import React from 'react';

const LoadingComp = () => {
  return (
    <div className={s.loading}>
      <div className={s.loader}></div>
    </div>
  );
};

export default LoadingComp;
