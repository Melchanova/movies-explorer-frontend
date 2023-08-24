import React from "react";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Form.css";


function Form({ linkText, link, children, title, btnText, question }) {
  return (
    <section className="form">
        <Link to="/" className="logo">
          <img src={Logo} alt="Смайлик"/>
        </Link>
        <h3 className="form__title">{title}</h3>
        <form className="forma" id="form" noValidate>
          {children}
          <button type="submit" className="form__btn-save">
            {btnText}
          </button>
        </form>
        <p className="form__text">
          {question}
          <Link to={link} className="form__link">
            {linkText}
          </Link>
        </p>
    </section>
  );
}

export default Form;
