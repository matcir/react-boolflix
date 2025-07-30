import Card from "./Card"

export default function AppMain({ filteredAll, setFilteredAll, getRating }) {
    return (
        <>
            <main className="bg-dark">
                <div className="p-3 container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-xl-5 g-3">
                        {filteredAll?.map(item => (
                            <Card key={item.id} item={item} getRating={getRating} />
                        ))}
                    </div>
                </div >
            </main>
        </>
    )
}