import React from "react"
import "./Profile.css"

function Profile() {
  return (
    <>
      <section className="profile">
        <h3 className="profile__title">Привет, Марианна!</h3>
        <form id="form" className="profile__form" noValidate>
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="Марианна"
            />
            <span className="profile__input-error"></span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              placeholder="ani-mania@mail.ru"
            />
            <span className="profile__input-error"></span>
          </label>
          <button type="submit" className="profile__btn-save">
            Редактировать
          </button>
          <button type="button" className="profile__exit">
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
