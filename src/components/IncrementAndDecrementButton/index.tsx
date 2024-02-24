import { Flex } from 'antd';
import { Button } from '../Button';
import s from './style.module.scss';

interface IncrementAndDecrementButtonProps {
  amount: number;
  setAmount: (amount: number) => void;
  size?: 'small' | 'default';
  className?: string;
}

export default function IncrementAndDecrementButton({
  amount,
  size = 'default',
  setAmount,
}: IncrementAndDecrementButtonProps): React.ReactElement {
  const handleMinusAmount = () => {
    if (isNaN(amount)) setAmount(1);
    if (amount > 1) setAmount(amount - 1);
  };
  const handlePlusAmount = () => {
    setAmount(amount + 1);
  };

  const classNameSize = s[`incrementAndDecrementBtn__${size}`];

  return (
    <Flex className={`${s.incrementAndDecrementBtn} ${classNameSize}`}>
      <Button variant="text" className={s.minusBtn} onClick={handleMinusAmount}>
        -
      </Button>
      <input
        className={s.input}
        value={amount}
        type="number"
        min={1}
        onChange={e => {
          const newValue = parseInt(e.target.value, 10);
          if (!isNaN(newValue) && newValue >= 1) {
            setAmount(newValue);
          }
        }}
      />
      <Button variant="text" className={s.addBtn} onClick={handlePlusAmount}>
        +
      </Button>
    </Flex>
  );
}
