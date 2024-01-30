import React from 'react';
import s from './style.module.scss';
import { Radio, RadioChangeEvent } from 'antd';
import { colorPicker } from '@/constants/options';

type IHandlderColorChange = {
  colorModel: 'be' | 'brown' | 'black' | 'white';
  handleColorChange: (e: RadioChangeEvent) => void;
  className?: string;
};

const RadioColor: React.FC<IHandlderColorChange> = ({
  className,
  colorModel,
  handleColorChange,
}) => {
  return (
    <div className={`${s.radioColor} ${className}`}>
      <Radio.Group value={colorModel} onChange={handleColorChange}>
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
