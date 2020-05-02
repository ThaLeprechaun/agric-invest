import React from 'react';
import './button.css';

interface ButtonType {
  buttonClass?: React.CSSProperties | any;
  buttonName: string | JSX.Element;
  onClick?: any;
}

export default function Button({
  buttonClass,
  buttonName,
  onClick,
}: ButtonType) {
  return (
    <div>
      <button className={`button ${buttonClass}`} onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
}
