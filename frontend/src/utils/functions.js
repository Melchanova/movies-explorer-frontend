import { MAX_SHORT_DURATION } from "./constants"

export const handleRequest = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

export function filterDurationTime(movies) {
  return movies.filter((movie) => movie.duration < MAX_SHORT_DURATION)
}

export function filterMoviesFilms(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}

export function durationConverterTime(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}
