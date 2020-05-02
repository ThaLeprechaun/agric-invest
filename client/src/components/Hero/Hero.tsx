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
            <div className="heroImg__holder--bottomText">
              Invest in our farms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
