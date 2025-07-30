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

  }

  function getRating(rating) {
    const stars = []
    const rounded = Math.floor(rating / 2)
    for (let i = 0; i < 5; i++) {
      if (i < rounded) {
        stars.push(<i className="bi bi-star-fill text-warning"></i>)
      }
      else {
        stars.push(<i className="bi bi-star text-warning"></i>)
      }
    }
    return stars
  }


  return (
    <>

      <header>
        <div className="bg-dark d-flex justify-content-between">
          <h3 className="p-3 text-danger">BOOLFLIX</h3>
          <form className="p-3 " onSubmit={handleSubmit}>
            <input type="text" placeholder="Inserisci il titolo di un film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="mx-2 btn btn-danger">Cerca</button>
          </form>
        </div>
      </header>
      <div className="p-3 container">
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
                    {item.original_title !== item.title && (
                      <li>{item.original_title}</li>
                    )}
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
                    <li>{getRating(item.vote_average)}</li>
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
