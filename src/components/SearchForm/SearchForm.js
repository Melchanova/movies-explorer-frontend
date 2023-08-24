import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" id="form">
        <input
          name="query"
          className="search__input"
          id="search-input"
          required
          type="text"
          placeholder="Фильм"
        ></input>
        <button className="search__btn" type="submit"></button>
      </form>
      <FilterCheckbox />

      <div className="search__border-btn"></div>
    </section>
  );
}

export default SearchForm;
