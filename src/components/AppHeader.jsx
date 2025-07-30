export default function AppHeader({ searchQuery, setSearchQuery, handleSubmit, allGenres, setSelectedGenre }) {
    return (
        <>
            <header>
                <div className="bg-black d-flex justify-content-between">
                    <h3 className="p-3 text-danger">BOOLFLIX</h3>
                    <form className="p-3 " onSubmit={handleSubmit}>
                        <input className="mx-3" type="text" placeholder="Inserisci il titolo di un film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <select name="genres" id="genres" onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="">Tutti i generi</option>
                            {allGenres.map(genre => (
                                <option key={genre.id} value={genre.id} > {genre.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="mx-2 btn btn-danger">Cerca</button>
                    </form>
                </div>
            </header >
        </>
    )
}