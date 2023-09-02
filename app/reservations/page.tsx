import getCarById from "../actions/getCarById";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ReservationCard from "../components/reservations/ReservationCard";

interface IReservationsPage {
    reservationId?: string,
}

const ReservationsPage = async ({ params }: { params: IReservationsPage}) => {

    const currentUser = await getCurrentUser();
    const reservations = await getReservations({userId: currentUser?.id});

    if(!currentUser || reservations.length === 0) {
        return <EmptyState title="No reservations made yet" subtitle="Go check our cars and make one! :)" path="/models"/>
    }

    return (
        <div className="min-h-[51vh]">
            <Container>
                <p className="text-[32px] sm:text-[42px] font-bold">
                    My reservations
                </p>
                <div className="w-full flex flex-col gap-4 mt-4">
                    {reservations.map(async (res) => {
                        // vezi daca merge cu res.car
                        const currCar = await getCarById({carId: res.carId});
                        if(currCar) {
                            return (
                                <ReservationCard key={res.id} car={currCar} reservation={res} />
                            )
                        }
                    })}
                </div>
            </Container>
        </div>
    )
}

export default ReservationsPage;