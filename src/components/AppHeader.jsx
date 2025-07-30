export default function AppHeader({ searchQuery, setSearchQuery, handleSubmit }) {
    return (
        <>
            <header>
                <div className="bg-black d-flex justify-content-between">
                    <h3 className="p-3 text-danger">BOOLFLIX</h3>
                    <form className="p-3 " onSubmit={handleSubmit}>
                        <input type="text" placeholder="Inserisci il titolo di un film..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button type="submit" className="mx-2 btn btn-danger">Cerca</button>
                    </form>
                </div>
            </header>
        </>
    )
}