import { useState } from "react"

import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"

export default function App() {

  const [filteredSeries, setFilteredSeries] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [filteredAll, setFilteredAll] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

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
        })
    ])


      .then(([filteredMovies, filteredSeries]) => {
        const all = [
          ...filteredMovies,
          ...filteredSeries.map(serie => ({
            title: serie.name,
            original_title: serie.original_name,
            id: serie.id,
            vote_average: serie.vote_average,
            poster_path: serie.poster_path
          }))


        ]

        setFilteredAll(all);
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

      <AppHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} />
      <AppMain filteredAll={filteredAll} setFilteredAll={setFilteredAll} getRating={getRating} />
    </>
  )
}
