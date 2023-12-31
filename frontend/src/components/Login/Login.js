import React from "react"
import { EMAIL_REGEX } from "../../utils/constants"
import useForm from "../../hooks/useForm"
import Form from "../Form/Form"
import "../Form/Form.css"

function Login({ onAuthorization, isLoading }) {

  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function submitUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={submitUserInfo}
      isDisabledButton={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          placeholder="Ваш Email"
          onChange={handleChangeInput}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ""}
          required
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          placeholder="Ваш пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
          required
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
