import React from 'react';
import menu from '../../menu';
import './how.css';
import Card from '../Card/Card';

export default function HowList() {
  return (
    <div className="container">
      <div className="row">
        <div className="how-card__container">
          {menu.howItem.map((item, index) => (
            <Card cardClass="how-card" key={index}>
              <div className="how-container">
                <div className="how__name">{item.name}</div>
                <div className="how__details">{item.details}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
