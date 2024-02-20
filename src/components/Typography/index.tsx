import TypographyBody, { TypographyBodyProps } from './Body';
import TypographyHeading, { TypographyHeadingProps } from './Heading';
import TypographyLabel, { TypographyLabelProps } from './Label';

export type TypographyProps =
  | TypographyBodyProps
  | TypographyHeadingProps
  | TypographyLabelProps

export type TypographyColor =
  | 'inherit'
  | 'tan'
  | 'black'
  | 'coral'

export { TypographyBody, TypographyHeading, TypographyLabel};
