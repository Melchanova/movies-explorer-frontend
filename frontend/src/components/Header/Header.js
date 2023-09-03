import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import menu from "../../images/menu-btn.svg";
import account from "../../images/account-btn.svg";

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = useState(false);

  const setActiveLink = ({ isActive }) =>
    isActive ? "header__btn_active" : "header__btn";

  function handleOpenMenu() {
    setIsClicked(true);
  }

  function handleCloseMenu() {
    setIsClicked(false);
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="logo">
            <img src={logo} alt="Смайлик"/>
          </Link>
          <div className="header__btn-container">
            <Link to="/signup" className="header__btn">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn header__btn-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_gray" id="header-gray">
          <Link to="/" className="logo">
            <img src={logo} alt="Смайлик"/>
          </Link>
          <div className="header__btn-container-films">
            <NavLink to="/movies" className={setActiveLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActiveLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__btn-container">
            <Link to="/profile" className="header__account-btn">
              <img
                className="header__account-image"
                src={account}
                alt="Кнопка входа в аккаунт"
              />
            </Link>
            <button className="header__menu-btn" onClick={handleOpenMenu}>
              <img src={menu} alt="Кнопка меню"/>
            </button>
          </div>
          {isClicked ? <Navigation handleCloseMenu={handleCloseMenu} /> : ""}
        </header>
      )}
    </>
  );
}

export default Header;
