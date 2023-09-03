import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

function SearchForm({ searchFilterMovie, onfilterMoviesFilms, isShortMovies }) {
  const location = useLocation();

  const [isQueryError, setIsQueryError] = useState(false);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    }
  }, [location]);

  function submitUserInfo(e) {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      searchFilterMovie(query);
    }
  }

  function handleQueryValue(event) {
    setQuery(event.target.value);
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={submitUserInfo}>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={handleQueryValue}
          value={query || ""}
        ></input>
        <button className="search__btn" type="submit"></button>
      </form>
      <FilterCheckbox
        isShortMovies={isShortMovies}
        onfilterMoviesFilms={onfilterMoviesFilms}
      />

      {isQueryError && (
        <span className="search__form-error">Введите ключевое слово</span>
      )}

      <div className="search__border-btn"></div>
    </section>
  );
}

export default SearchForm;
