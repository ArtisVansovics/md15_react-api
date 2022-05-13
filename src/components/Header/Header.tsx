import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const getActiveClassName = (isActive: boolean) => (
  isActive ? `${styles.nav__link} ${styles['nav__link--active']}` : `${styles.nav__link}`
);

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
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
    <h1 className={styles.header__title}>
      The Rick And Morty Page
    </h1>
  </header>
);

export default Header;
