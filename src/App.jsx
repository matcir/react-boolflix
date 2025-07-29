import { useState, useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import locale from 'locale-codes'
import LanguageToCountry from "./db/LanguageToCountry"

export default function App() {

  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_DBMOVIE_KEY}&query=${searchQuery}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setFilteredMovies(data.results)
      })
      .catch(err => {
        alert("Si è verificato un errore nel carimento dei dati, riprova")
      })
  }


  return (
    <>
      <div className="p-3 container">
        <h3>Effettua una ricerca per titolo</h3>
        <form className="p-3" onSubmit={handleSubmit}>
          <input type="text" placeholder="Inserisci il titolo di un film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit" className="mx-3  btn btn-primary">Cerca</button>
        </form>
        <div className="p-3 row row-cols-1 row-cols-md-3 g-3">
          {filteredMovies?.map(movie => (
            <div key={movie.id} className="col">
              <div className="card h-100 p-3">
                <ul className="list-unstyled list-group">
                  <li>{movie.title}</li>
                  <li>{movie.original_title}</li>
                  <li>
                    {LanguageToCountry[movie.original_language] ? (
                      <ReactCountryFlag
                        countryCode={LanguageToCountry[movie.original_language]}
                        svg
                        style={{ width: '2em', height: '2em' }}
                        title={movie.original_language}
                      />
                    ) : (
                      <span style={{ fontSize: '2em' }}>🌐</span>
                    )}
                  </li>
                  <li>{movie.vote_average}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  )
}
