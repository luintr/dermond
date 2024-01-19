import React from 'react';
import s from './style.module.scss';
import { ArrowIcon } from '@/components/Icons';

type IRoundedText = {
  className?: string;
  textColor?: string;
};

const RoundedText = ({ className, textColor }: IRoundedText) => {
  return (
    <div className={`${s.roundedText} ${className}`}>
      <ArrowIcon fill={textColor} />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
        <path
          id="circlePath"
          transform="translate(25 25)"
          d="M50,100L50,100C22.4,100,0,77.6,0,50v0C0,22.4,22.4,0,50,0h0c27.6,0,50,22.4,50,50v0C100,77.6,77.6,100,50,100z"
          fill="transparent"
        />
        <g>
          <text fill={`${textColor ? textColor : '#fff'}`}>
            <textPath xlinkHref="#circlePath">
              BROWSE OUR STORY BROWSE OUR STORY BROWSE OUR STORY
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RoundedText;
