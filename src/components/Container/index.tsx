import React, { ReactNode } from 'react';

type IContainer = {
  className?: string;
  children: ReactNode;
};

const Container = ({ className, children }: IContainer): React.ReactElement => {
  return <div className={`${className} container`}>{children}</div>;
};

export default Container;
