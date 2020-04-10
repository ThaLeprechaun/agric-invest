import React from 'react';
import './main.css';

interface MainProps {
  children: JSX.Element[] | JSX.Element;
}
export default function Main({ children }: MainProps) {
  return <div className="main__container">{children}</div>;
}
