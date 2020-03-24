import React from 'react';
import './button.css';

interface ButtonType {
  buttonClass?: React.CSSProperties | any;
  buttonName: string | JSX.Element;
}

export default function Button({ buttonClass, buttonName }: ButtonType) {
  return (
    <div>
      <button className={`button ${buttonClass}`}>{buttonName}</button>
    </div>
  );
}
