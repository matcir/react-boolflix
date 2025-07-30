import { useEffect, useState } from "react"

import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"

export default function App() {

  const [filteredSeries, setFilteredSeries] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [filteredAll, setFilteredAll] = useState([])
  const [moviesGenres, setMoviesGenres] = useState([])
  const [seriesGenres, setSeriesGenres] = useState([])
  const [allGenres, setAllGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const urlMoviesGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_DBMOVIE_KEY}`
  const urlSeriesGenre = `https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_DBMOVIE_KEY}`

  useEffect(() => {
    Promise.all([
      fetch(urlMoviesGenre)
        .then(res => res.json())
        .then(data3 => {
          setMoviesGenres(data3.genres)
          return data3.genres
        }),
      fetch(urlSeriesGenre)
        .then(res => res.json())
        .then(data4 => {
          setSeriesGenres(data4.genres)
          return data4.genres
        })
    ])

      .then(([moviesGenres, seriesGenres]) => {
        const all = [...moviesGenres, ...seriesGenres]

        const uniqueGenres = all.filter((genre, index, self) =>
          index === self.findIndex(item => item.name === genre.name)
        );

        setAllGenres(uniqueGenres)
      })
  })

  function handleSubmit(e) {
    e.preventDefault()

    const urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_DBMOVIE_KEY}&query=${searchQuery}`
    const urlSeries = `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_DBMOVIE_KEY}&query=${searchQuery}`

    Promise.all([
      fetch(urlMovies)
        .then(res => res.json())
        .then(data1 => {
          setFilteredMovies(data1)
          return data1.results
        }),
      fetch(urlSeries)
        .then(res => res.json())
        .then(data2 => {
          setFilteredSeries(data2)
          return data2.results
        }),
    ])


      .then(([filteredMovies, filteredSeries]) => {
        const all = [
          ...filteredMovies,
          ...filteredSeries.map(serie => ({
            title: serie.name,
            original_title: serie.original_name,
            id: serie.id,
            vote_average: serie.vote_average,
            poster_path: serie.poster_path,
            name: serie.name
          }))
        ];


        const filtered = selectedGenre
          ? all.filter(item =>
            item.genre_ids?.includes(Number(selectedGenre))
          )
          : all;


        setFilteredAll(filtered);
      })



  }

  function getRating(rating) {
    const stars = []
    const rounded = Math.floor(rating / 2)
    for (let i = 0; i < 5; i++) {
      if (i < rounded) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>)
      }
      else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>)
      }
    }
    return stars
  }


  return (
    <>

      <AppHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} allGenres={allGenres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <AppMain filteredAll={filteredAll} setFilteredAll={setFilteredAll} getRating={getRating} />
    </>
  )
}
