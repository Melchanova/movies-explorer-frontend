import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterMoviesFilms, filterDurationTime } from "../../utils/functions"
import Header from "../Header/Header"
import * as movies from "../../utils/MoviesApi"
import "./Movies.css"

function Movies({ loggedIn, handleLikeFilm, onDeleteCard, savedMovies }) {

  const [isLoading, setIsLoading] = useState(false)
  const [isReqError, setisReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortMovies, setisShortMovies] = useState(false)

  function handleFilterMovie(movies, query, short) {
    const moviesCardList = filterMoviesFilms(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(short ? filterDurationTime(moviesCardList) : moviesCardList)
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  function searchFilterMovie(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleFilterMovie(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          handleFilterMovie(cardsData, query, isShortMovies)
          setisReqError(false)
          console.log(cardsData)
        })
        .catch((err) => {
          setisReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  function handleShortFilterCheckbox() {
    setisShortMovies(!isShortMovies)
    if (!isShortMovies) {
      if (filterDurationTime(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDurationTime(initialCardsMovies))
      } else {
        setFilteredMovies(filterDurationTime(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
    console.log(!isShortMovies)
  }

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationTime(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      console.log(setisShortMovies)
      setisShortMovies(true)
    } else {
      setisShortMovies(false)
      console.log(setisShortMovies)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onfilterMoviesFilms={handleShortFilterCheckbox}
        searchFilterMovie={searchFilterMovie}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
      />
      <Footer />
    </section>
  )
}

export default Movies
