import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import Account from "../../images/account-btn.svg";

function Navigation({ handleClose }) {
  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__menu">
        <button
          className="navigation__close-btn"
          onClick={handleClose}
        ></button>
        <nav className="navigation__links">
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeclassname="navigation__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__link"
            activeclassname="navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeclassname="navigation__link_active"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-btn">
          <img src={Account} alt="Кнопка входа в аккаунт" />
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
