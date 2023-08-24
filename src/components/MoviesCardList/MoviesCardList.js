import React from "react";
import SearchError from "../SearchError/SearchError";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList() {
  return (
    <section className="films">

      <SearchError errorText={"Ничего не найдено"} />

      <SearchError
        errorText={
          "Во время запроса произошла ошибка, попробуйте ещё раз"
        }
      />

      <ul className="films__list">
        <MoviesCard />
      </ul>
      <div className="films__btn-container">
        <button className="films__btn">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
