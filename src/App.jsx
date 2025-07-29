import { useState, useEffect } from "react"

export default function App() {

  const [filteredMovies, setFilteredMovies] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  function handleSearchClick() {

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
      <div className="container">
        <h3>Effettua una ricerca per titolo</h3>
        <input className="px-3" type="text" placeholder="Inserisci il titolo di un film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className="px-3 btn btn-primary" onClick={handleSearchClick}>Cerca</button>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {filteredMovies?.map(movie => (
            <div className="col">
              <div key={movie.id} className="card p-3">
                <ul className="list-unstyled list-group">
                  <li>{movie.title}</li>
                  <li>{movie.original_title}</li>
                  <li>{movie.original_language}</li>
                  <li>{movie.vote_average}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
