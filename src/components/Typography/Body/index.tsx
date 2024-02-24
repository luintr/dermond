import cn from 'classnames';
import React, { forwardRef, PropsWithChildren } from 'react';

import { TypographyColor } from '..';
import styles from './styles.module.scss';

export interface TypographyBodyProps extends PropsWithChildren {
  color?: TypographyColor;
  size?: 12 | 14 | 16 | 20;
  tag?: 'p';
  className?: string;
}

const TypographyBody = forwardRef<HTMLParagraphElement, TypographyBodyProps>(
  (props: TypographyBodyProps, ref) => {
    const {
      color = 'white',
      size = 16,
      tag: Tag = 'p',
      className,
      children,
      ...restProps
    } = props;
    const bodyClassNames = cn(
      styles.body,
      color && styles[`body__${color}`],
      styles[`body__${size}`],
      className
    );
    return (
      <Tag {...restProps} ref={ref} className={bodyClassNames}>
        {children}
      </Tag>
    );
  }
);

TypographyBody.displayName = 'TypographyBody';

export default TypographyBody;
