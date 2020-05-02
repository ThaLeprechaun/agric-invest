import React from 'react';
import HowList from './HowList';

export default function HowItWorks() {
  return (
    <div className="container-fluid main-how">
      <div className="how-main__container">
        <div className="heading text-header__how">
          <h4>How it works</h4>
        </div>
        <HowList />
      </div>
    </div>
  );
}
