import React from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"

function SavedMovies() {
  return (
    <section className="movies">
      <MoviesCardList />
      <SearchForm />
      <Footer />
    </section>
  )
}

export default SavedMovies
