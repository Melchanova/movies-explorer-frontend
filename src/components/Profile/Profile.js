import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Header from "../Header/Header"
import { EMAIL_REGEX } from "../../utils/constants"
import useForm from "../../hooks/useForm"
import "./Profile.css"

function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  const currentUser = useContext(CurrentUserContext)

  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function submitUserInfo(event) {
    event.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={submitUserInfo}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              placeholder="Ваше имя"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              minLength="2"
              maxLength="40"
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              placeholder="Ваш Email"
              onChange={handleChangeInput}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ""}
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__btn-save form__btn-save_inactive"
                : "profile__btn-save"
            }
          >
            Редактировать
          </button>
          <button type="button" className="profile__close" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
