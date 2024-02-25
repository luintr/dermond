import { Radio, RadioChangeEvent } from 'antd';
import React from 'react';
import s from './style.module.scss';
import { sizePicker } from '@/constants/utils';

type IHandlderSizeChange = {
  sizeModel: 'S' | 'M' | 'L';
  handleSizeChange?: (e: RadioChangeEvent) => void;
  addtoCartHandler?: (e: RadioChangeEvent) => void;
  className?: string;
  small?: boolean;
  disableValue?: 'S' | 'M' | 'L';
};

const RadioSize: React.FC<IHandlderSizeChange> = ({
  sizeModel,
  handleSizeChange,
  addtoCartHandler,
  className,
  small,
  disableValue,
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    if (addtoCartHandler) {
      addtoCartHandler(e);
    } else if (handleSizeChange) {
      handleSizeChange(e);
    } else {
      return;
    }
  };
  return (
    <div className={`${s.radioSize} ${small && s.small} ${className}`}>
      <Radio.Group value={sizeModel} onChange={handleChange}>
        {sizePicker.map((item, index) => (
          <Radio.Button
            key={index}
            value={item.value}
            disabled={item.value === disableValue}
          >
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioSize;
