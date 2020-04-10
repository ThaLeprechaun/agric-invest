import React from 'react';

import './hero.css';

export default function Hero() {
  return (
    <div className="heroImg__container">
      <div className="row">
        <div className="col-sm-12">
          <div className="heroImg__holder">
            <div className="heroImg__holder--headText">
              <h1>AgroInvest Farms</h1>
            </div>
            <p className="heroImg__holder--bottomText">Invest in our farms</p>
          </div>
        </div>
      </div>
    </div>
  );
}
