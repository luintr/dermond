import React, { ReactNode } from 'react';

interface StackProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
  > {
  children: React.ReactElement[];
  divider?: React.ReactElement;
}

export default function Stack({
  children,
  divider,
  className,
}: StackProps): React.ReactElement {
  const stackItems: ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    stackItems.push(child);

    if (index < React.Children.count(children) - 1 && divider) {
      stackItems.push(React.cloneElement(divider, { key: `divider-${index}` }));
    }
  });

  return <div className={className}>{stackItems}</div>;
}
