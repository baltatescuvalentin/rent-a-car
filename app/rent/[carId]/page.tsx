import getCarById from "@/app/actions/getCarById"
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import Rent from "@/app/components/rent/Rent";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { eachDayOfInterval } from "date-fns";

interface IRentPage {
    carId?: string,
}

const RentPage = async ({ params } : {params: IRentPage}) => {

    const currCar = await getCarById(params); 
    const reservations = await getReservations({carId: params.carId});
    const currentUser = await getCurrentUser();

    const disabledDates = () => {
        let dates: Date[] = [];
        if(currCar?.availableCount === 0) {
            reservations.forEach((reservation) => {
                const range = eachDayOfInterval({
                    start: new Date(reservation.startDate),
                    end: new Date(reservation.endDate),
                })

                dates = [...dates, ...range];
            })
        }

        return dates;
    }
    const disabledDatesArray = disabledDates();

    if(!currCar) {
        return (
            <EmptyState />
        )
    }

    return (
        <div className="min-h-[50.5vh]">
            <Container>
                <div className="flex flex-col ">
                    <p className="text-[28px] lg:text-[42px] font-semibold text-center drop-shadow-lg shadow-black">
                        Rent our car!
                    </p>
                    <div className="mt-5">
                        <Rent disabledDates={disabledDatesArray} currentUser={currentUser} price={currCar.price} images={currCar.imgSrc} carId={currCar.id} availableCount={currCar.availableCount} reservations={reservations}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default RentPage;