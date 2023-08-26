import React from "react";
import "./MoviesCard.css";

function MoviesCard() {
  return (
    <>
      <li className="film">
        {/* карточка вставлена чтобы увидеть структуру разметки страницы */}
        <img alt="" className="film__image" />
        <div className="film__container">
          <div className="film__title-info">
            <h2 className="film__title">33 слова о дизайне</h2>
            <span className="film__time">1ч 47м</span>
          </div>
          <button type="button" className="film__like-button film__like-button_active"></button>
        </div>
      </li>
      <li className="film">
        <img alt="" className="film__image" />
        <div className="film__container">
          <div className="film__title-info">
            <h2 className="film__title">Киноальманах «100 лет дизайна»</h2>
            <span className="film__time">1ч 3м</span>
          </div>
          <button type="button" className="film__like-button"></button>
        </div>
      </li>
      <li className="film">
        <img alt="" className="film__image" />
        <div className="film__container">
          <div className="film__title-info">
            <h2 className="film__title">В погоне за Бенкси</h2>
            <span className="film__time">1ч 42м</span>
          </div>
          <button type="button" className="film__delete-btn"></button>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
