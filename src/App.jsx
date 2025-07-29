import { useState, useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import LanguageToCountry from "./db/LanguageToCountry"

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



    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     setFilteredMovies(data.results)
    //   })
    //   .catch(err => {
    //     alert("Si è verificato un errore nel carimento dei dati, riprova")
    //   })
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
          {filteredAll?.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100 p-3">
                <figure>
                  <img className="card-img-top img-fluid" src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`} alt="" />
                </figure>
                <div className="card-body">
                  <ul className="list-unstyled list-group">
                    <li>{item.title}</li>
                    <li>{item.original_title}</li>
                    <li>
                      {LanguageToCountry[item.original_language] ? (
                        <ReactCountryFlag
                          countryCode={LanguageToCountry[item.original_language]}
                          svg
                          style={{ width: '2em', height: '2em' }}
                          title={item.original_language}
                        />
                      ) : (
                        <span style={{ fontSize: '2em' }}>🌐</span>
                      )}
                    </li>
                    <li>{item.vote_average}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  )
}
