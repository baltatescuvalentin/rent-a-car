import getCarById from "../actions/getCarById";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import AdminAddCarButton from "../components/AdminAddCarButton";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ReservationCard from "../components/reservations/ReservationCard";
import ReservationCardAdmin from "../components/reservations/ReservationCardAdmin";

interface IDashboardPage {
    reservationId?: string,
}

const DashboardPage = async ({ params }: { params: IDashboardPage}) => {

    const currentUser = await getCurrentUser();

    if(!currentUser?.isAdmin || !currentUser) {
        return (
            <EmptyState title="Not Allowed!" subtitle="Only admins can access this page!" label="Home"/>
        )
    }

    const reservations = await getReservations({});

    if(reservations.length === 0) {
        return <EmptyState title="No reservations made yet" subtitle="Wait for users to make some" path="/models"/>
    }

    return (
        <div className="min-h-[51vh]">
            <Container>
                <AdminAddCarButton />
                <div className="w-full flex flex-col gap-4 mt-4">
                    {reservations.map(async (res) => {
                        // vezi daca merge cu res.car
                        const currCar = await getCarById({carId: res.carId});
                        if(currCar) {
                            return (
                                <ReservationCardAdmin key={res.id} car={currCar} reservation={res} />
                            )
                        }
                    })}
                </div>
            </Container>
        </div>
    )
}

export default DashboardPage;