import React from 'react';
import './card.css';

interface CardProps {
  children: string | JSX.Element | JSX.Element[];
  cardClass?: string;
}

export default function Card({ children, cardClass }: CardProps) {
  return <div className={`card ${cardClass}`}>{children}</div>;
}
