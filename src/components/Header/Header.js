import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo.svg";
import Account from "../../images/account-btn.svg";
import Menu from "../../images/menu-button.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();

  // Временная функция для проверки, нужно ли отображать второй хедер
  const showTwoHeader = () => {
    const { pathname } = location;
    return (
      pathname === "/movies" ||
      pathname === "/saved-movies" ||
      pathname === "/profile"
    );
  };

  // Временная функция для проверки, нужно ли отображать первый хедер
  const showOneHeader = () => {
    const { pathname } = location;
    return pathname === "/";
  };

  const [isClicked, setIsClicked] = React.useState(false);

  function handleOpen() {
    setIsClicked(true);
  }

  function handleClose() {
    setIsClicked(false);
  }

  return (
    <>
      {showOneHeader() && (
        <header className="header" id="header">
          <Link to="/" className="logo">
            <img src={Logo} alt="Логотип приложения"/>
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
      )}

      {showTwoHeader() && (
        <header className="header header_gray" id="header-gray">
          <Link to="/" className="logo">
            <img src={Logo} alt="Логотип приложения"/>
          </Link>
          <div className="header__btn-container-films">
            <NavLink
              to="/movies"
              className="header__btn"
              activeclassname="header__btn_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="header__btn"
              activeclassname="header__btn_active"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__btn-container">
            <Link to="/profile" className="header__account-btn">
              <img
                className="header__account-image"
                src={Account}
                alt="Кнопка входа в аккаунт"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpen}>
              <img src={Menu} alt="Кнопка меню"/>
            </button>
          </div>
          {isClicked ? <Navigation handleClose={handleClose}/> : ""}
        </header>
      )}
    </>
  );
}

export default Header;
