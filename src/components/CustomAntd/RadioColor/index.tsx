import React from 'react';
import s from './style.module.scss';
import { Radio, RadioChangeEvent } from 'antd';
import { colorPicker } from '@/constants/utils';

type IHandlderColorChange = {
  colorModel: 'be' | 'brown' | 'black' | 'white';
  handleColorChange?: (e: RadioChangeEvent) => void;
  addtoCartHandler?: (e: RadioChangeEvent) => void;
  className?: string;
  small?: boolean;
};

const RadioColor: React.FC<IHandlderColorChange> = ({
  className,
  colorModel,
  handleColorChange,
  addtoCartHandler,
  small,
}) => {
  const handleChange = (e: RadioChangeEvent) => {
    if (addtoCartHandler) {
      addtoCartHandler(e);
    } else if (handleColorChange) {
      handleColorChange(e);
    } else {
      return;
    }
  };
  return (
    <div className={`${s.radioColor} ${small && s.small} ${className}`}>
      <Radio.Group value={colorModel} onChange={handleChange}>
        {colorPicker.map((item, index) => (
          <Radio.Button
            key={index}
            value={item.name}
            style={{ backgroundColor: item.color }}
          >
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioColor;
