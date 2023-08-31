import React, { useState, useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import { filterMoviesFilms, filterDurationTime } from "../../utils/functions";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn, savedMovies, onDeleteCard }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortMovies, setisShortMovies] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function searchFilterMovie(query) {
    setSearchQuery(query);
  }

  function handleShortFilterCheckbox() {
    setisShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesCardList = filterMoviesFilms(savedMovies, searchQuery);
    setFilteredMovies(
      isShortMovies ? filterDurationTime(moviesCardList) : moviesCardList
    );
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        searchFilterMovie={searchFilterMovie}
        onfilterMoviesFilms={handleShortFilterCheckbox}
      />
      <MoviesCardList
        cards={filteredMovies}
        savedMovies={savedMovies}
        isNotFound={isNotFound}
        isSavedFilms={true}
        onDeleteCard={onDeleteCard}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
