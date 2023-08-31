import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchError from "../SearchError/SearchError";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import {
  NUMBER_MOVIES_DESKTOP,
  TABLET_ITEMS_DISPLAY,
  MOBILE_ITEMS_DISPLAY,
  SIZE_DESKTOP,
  SIZE_TABLET,
  SIZE_TWELVE,
  SIZE_EIGHT,
  SIZE_FIVE,
} from "../../utils/constants";

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  function calculateMoviesWidht() {
    const display = window.innerWidth;
    
    if (display > SIZE_DESKTOP) {
      setShownMovies(SIZE_TWELVE);
    } else if (display > SIZE_TABLET) {
      setShownMovies(SIZE_EIGHT);
    } else {
      setShownMovies(SIZE_FIVE);
    }
  }

  useEffect(() => { 
    calculateMoviesWidht(); 
  }, [cards]);

  useEffect(() => {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculateMoviesWidht();
      }, 500);
    }
    
    calculateMoviesWidht();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function increaseShownMovies() {
    const display = window.innerWidth;
    
    if (display > SIZE_DESKTOP) {
      setShownMovies(shownMovies + NUMBER_MOVIES_DESKTOP);
    } else if (display > SIZE_TABLET) {
      setShownMovies(shownMovies + TABLET_ITEMS_DISPLAY);
    } else {
      setShownMovies(shownMovies + MOBILE_ITEMS_DISPLAY);
    }
  }

  function handleSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <section className="films">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением. Попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={handleSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    onDeleteCard={onDeleteCard}
                    handleLikeFilm={handleLikeFilm}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__btn-container"></div>
            </>
          ) : (
            <>
              <ul className="films__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={handleSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__btn-container">
                {cards.length > shownMovies ? (
                  <button
                    className="films__btn"
                    onClick={increaseShownMovies}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList
