import React from 'react';
import { NavLink } from 'react-router-dom';

const getActiveClassName = (isActive: boolean) => (
  isActive ? 'nav__link nav__link--active' : 'nav__link'
);

const Header = () => (
  <header className="header">
    <nav className="nav">
      <NavLink
        className={({ isActive }) => getActiveClassName(isActive)}
        to="/characters"
      >
        Characters
      </NavLink>
      <NavLink
        className={({ isActive }) => getActiveClassName(isActive)}
        to="/episodes"
      >
        Episodes
      </NavLink>
      <NavLink
        className={({ isActive }) => getActiveClassName(isActive)}
        to="/locations"
      >
        Locations
      </NavLink>
    </nav>
  </header>
);

export default Header;
