import { Flex } from 'antd';
import { Button } from '../Button';
import s from './style.module.scss';

interface IncrementAndDecrementButtonProps {
  amount: number;
  setAmount: (amount: number) => void;
  className?: string;
}

export default function IncrementAndDecrementButton({
  amount,
  setAmount,
}: IncrementAndDecrementButtonProps): React.ReactElement {
  const handleMinusAmount = () => {
    if (isNaN(amount)) setAmount(1);
    if (amount > 1) setAmount(amount - 1);
  };
  const handlePlusAmount = () => {
    setAmount(amount + 1);
  };

  return (
    <Flex className={s.incrementAndDecrementBtn}>
      <Button variant="text" className={s.minusBtn} onClick={handleMinusAmount}>
        -
      </Button>
      <input
        className={s.input}
        value={amount}
        type="number"
        min={1}
        defaultValue={1}
        onChange={e => {
          if (!isNaN(parseInt(e.target.value))) {
            setAmount(parseInt(e.target.value));
          }
        }}
      />
      <Button variant="text" className={s.addBtn} onClick={handlePlusAmount}>
        +
      </Button>
    </Flex>
  );
}
