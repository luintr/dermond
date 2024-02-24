import s from './style.module.scss';

interface PopoverProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'size' | 'color'
  > {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popover({
  isOpen,
  onClose,
  className,
  children,
}: PopoverProps) {
  return <div className={`${className} ${isOpen && s.open}`}>{children}</div>;
}
