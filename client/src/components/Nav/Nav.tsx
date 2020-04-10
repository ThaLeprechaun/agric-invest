import React from 'react';
import menu from '../../menu';

import './Nav.css';
import { Link } from 'react-router-dom';

interface NavType {
  logo: string;
}
export default function Nav({ logo }: NavType) {
  return (
    <nav className="nav__container">
      <div className="container-fluid">
        <div className="nav__container--content">
          <div className="nav__content--logo">
            <h2>{logo}</h2>
          </div>
          <div className="nav__content--items">
            <div className="nav__items">
              {menu.mainNavItem.map((item, index) => (
                <Link to={item.link} className="nav__items" key={index}>
                  <div>{item.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
