import React from "react";
import { Link, NavLink } from "react-router-dom";
import account from "../../images/account-btn.svg";
import "./Navigation.css";

function Navigation({ handleCloseMenu }) {
  const setActiveLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link";

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__mobile">
        <button
          className="navigation__close-btn"
          onClick={handleCloseMenu}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={setActiveLink} onClick={handleCloseMenu}>
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={setActiveLink}
            onClick={handleCloseMenu}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={setActiveLink}
            onClick={handleCloseMenu}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          to="/profile"
          className="navigation__account-btn"
          onClick={handleCloseMenu}
        >
          <img src={account} alt="Кнопка входа в аккаунт" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
