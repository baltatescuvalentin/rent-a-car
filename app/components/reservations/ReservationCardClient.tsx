'use client';

import { SafeReservation } from "@/app/types"
import { Car } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import {useRouter } from 'next/navigation'
import ReservationCard from "./ReservationCard"


interface ReservationCardClientProps {
    reservation?: SafeReservation | null,
    car: Car,
}

const ReservationCardClient: React.FC<ReservationCardClientProps> = ({ reservation, car }) => {

    const router = useRouter();

    const deleteReservation = () => {

        axios.post(`/api/car/${car.id}`, {
            availableCount: car.availableCount + 1
        })
            .then(() => {

            })
            .catch((error: any) => {
                toast.error('Error updating the car spec!');
            })

        axios.delete(`/api/reservations/${reservation?.id}`)
            .then(() => {
                toast.success('Reservation canceled!');
                router.refresh();
            })
            .catch((error: any) => {
                toast.error('Error deleting the reservation!');
            })
    }

    return (
        <ReservationCard car={car} reservation={reservation} deleteReservation={deleteReservation}/>
    )
}

export default ReservationCardClient;