import ReactCountryFlag from "react-country-flag"
import LanguageToCountry from "../db/LanguageToCountry"

export default function AppMain({ filteredAll, setFilteredAll, getRating }) {
    return (
        <>
            <main className="bg-dark">
                <div className="p-3 container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-xl-5 g-3">
                        {filteredAll?.map(item => (
                            <div key={item.id} className="col">
                                <div className="card h-100 p-2 bg-black">
                                    <figure>
                                        {item.poster_path ? (
                                            <img
                                                className="card-img-top img-fluid"
                                                src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`}
                                                alt={item.title}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="text-center p-3">Immagine non trovata</div>
                                        )}
                                    </figure>
                                    <div className="card-body hide">
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
                                            <li className="card-body-scroll overflow-auto overview-height">
                                                {item.overview}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </main>
        </>
    )
}