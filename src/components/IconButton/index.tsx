import { TypographyColor } from '../Typography';
import s from './styles.module.scss';

type ButtonVariant = 'solid' | 'outlined' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonShape = 'default' | 'rounded';

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
  > {
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
  color?: TypographyColor;
  loading?: boolean;
  disable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const IconButton = (props: ButtonProps): React.ReactElement => {
  const {
    children,
    type,
    disabled,
    variant = 'solid',
    className,
    size = 'md',
    shape = 'default',
    loading,
    disable,
    color = 'coral',
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      disabled={loading || disabled}
      type={type}
      className={`${s.iconButton}
        ${s[variant]}
        ${s[size]}
        ${s[shape]}
        ${loading ? s.loading : null}
        ${color ? s[color] : null}
        ${disabled || loading ? s.disabled : null}
        ${disable ? s.block : null}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
