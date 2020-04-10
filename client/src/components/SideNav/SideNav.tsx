import React from 'react';
import './sidenav.css';
import menu from '../../menu';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SideNav() {
  const selectedData = useSelector((state: any) => state);
  const userCategory = selectedData.authUser.user.user.userCategory;
  return (
    <div className="sidenav__container">
      <div className="sidenav__container--content">
        {menu.sideNavItem.map((item, index) => (
          <Link to={item.link} className="content__item" key={index}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
