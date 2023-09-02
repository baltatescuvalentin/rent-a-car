import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteCars from "../actions/getFavoriteCars";
import CarCard from "../components/CarCard";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";


const FavoritesPage = async () => {

    const currentUser = await getCurrentUser();
    const favorites = await getFavoriteCars();
    if(favorites.length === 0) {
        return <EmptyState title="No favorite cars yet" subtitle="Go to our models and find what you like" path="/models"/>
    }
    console.log(favorites);

    return (
        <Container>
            <div className="min-h-[51vh]">
                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center">
                    {
                        favorites?.map((fav) => <CarCard key={fav.id} data={fav} currentUser={currentUser}/>)
                    }
                </div>
            </div>
        </Container>
    )
}

export default FavoritesPage;