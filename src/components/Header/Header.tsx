import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

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
    <h1 className="header__title">
      The Rick And Morty Page
    </h1>
  </header>
);

export default Header;
