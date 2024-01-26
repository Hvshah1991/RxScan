import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

import rxscanLogo from "../../assets/images/logo/rxscanlogo.jpg";

function Header() {
    const [navSelect, setNavSelect] = useState(true);
  
    return (
      <header className="header">
        <Link className="header__left" to="/">
          <img
            className="header__logo"
            src={rxscanLogo}
            alt="rxscan-logo"
            onClick={() => {
              setNavSelect(true);
            }}
          />
        </Link>
        <nav className="navbar">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'navbar__link--selected' : 'navbar__link'}
            >
            <p className="navbar__link-text">Home</p>
          </NavLink>
          <NavLink
            to="/reminder"
            className={({ isActive }) => isActive ? 'navbar__link--selected' : 'navbar__link'}
            >
            <p className="navbar__link-text">Reminders</p>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'navbar__link--selected' : 'navbar__link'}
            >
            <p className="navbar__link-text">About</p>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => isActive ? 'navbar__link--selected' : 'navbar__link'}
            >
            <p className="navbar__link-text">Contact</p>
          </NavLink>
        </nav>
      </header>
    );
  }
  
  export default Header;