import React from 'react';
import s from './style.module.scss';

type IQtyInput = {
  qty: number;
  setQty: (qty: number) => void;
  addtoCartHandler?: () => void;
  className?: string;
  small?: boolean;
};

const QtyInput: React.FC<IQtyInput> = ({ qty, setQty, className, small }) => {
  const handleMinusQty = () => {
    setQty(qty - 1);
  };
  const handlePlusQty = () => {
    setQty(qty + 1);
  };

  return (
    <div className={`${s.qtyInput} ${small && s.small} ${className}`}>
      <button className={s.button} onClick={handleMinusQty}>
        <span>-</span>
      </button>
      <div className={s.qty}>
        <span>{qty}</span>
      </div>
      <button className={s.button} onClick={handlePlusQty}>
        <span>+</span>
      </button>
    </div>
  );
};

export default QtyInput;
