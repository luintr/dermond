import React from 'react';
import s from './style.module.scss';

type IQtyInput = {
  qty: number;
  setQty: (qty: number) => void;
  className?: string;
};

const QtyInput: React.FC<IQtyInput> = ({ qty, setQty, className }) => {
  const handleMinusQty = () => {
    setQty(qty - 1);
  };
  const handlePlusQty = () => {
    setQty(qty + 1);
  };

  return (
    <div className={`${s.qtyInput} ${className}`}>
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
