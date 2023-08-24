import React from "react"
import Form from "../Form/Form"
import "../Form/Form.css"

function Register() {
  return (
    <Form
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
          id="name-input"
          type="text"
          minLength="2"
          maxLength="40"
          required
          placeholder="Марианна" 
        />
        <span className="form__input-error">Заполните поле "Имя".</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="ani-mania@mail.ru" 
        />
        <span className="form__input-error">Адрес электронной почты должен содержать символ "@".</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          placeholder="Ваш пароль" 
        />
        <span className="form__input-error">Заполните поле "Пароль".</span>
      </label>
    </Form>
  )
}

export default Register