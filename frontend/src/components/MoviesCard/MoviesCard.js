import React from "react"
import "./MoviesCard.css"
import { durationConverterTime } from "../../utils/functions"

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {
 
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function onDelete() {
    console.log('delete card')
    console.log(card)
    onDeleteCard(card)
  }

  const cardLikeButton = `${
    saved ? "film__like-btn film__like-btn_active" : "film__like-btn"
  }`
  return (
    <>
      <li key={card.id} className="film">
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="film__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>
        <div className="film__container">
          <div className="film__title-block">
            <h2 className="film__title">{card.nameRU}</h2>
            <span className="film__time">
              {" "}
              {durationConverterTime(card.duration)}
            </span>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="film__delete-btn"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              onClick={onCardClick}
              className={cardLikeButton}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
