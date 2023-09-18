'use client';

import { Car, Reservation } from "@prisma/client";
import { SafeReservation } from "../../types";
import CarCard from "../CarCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbGps } from 'react-icons/tb';
import { PiPersonSimpleBikeBold } from 'react-icons/pi';
import { MdGpsFixed } from 'react-icons/md';
import { FaBaby, FaChild, FaSkiing } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsSnow } from 'react-icons/bs';
import { LuBike } from 'react-icons/lu';
import { AiFillCalendar } from 'react-icons/ai';
import { FcWiFiLogo } from "react-icons/fc";
import ReservationExtra from "./ReservationExtra";
import Image from 'next/image';
import ReservationCard from "./ReservationCard";


interface ReservationCardAdminProps {
    reservation?: SafeReservation | null,
    car: Car,
}

const ReservationCardAdmin: React.FC<ReservationCardAdminProps> = ({ reservation, car }) => {

    const router = useRouter();

    const deleteReservation = async () => {
        
        try {
            const aCount = car.availableCount + 1;
            let response1 = await axios.post(`/api/car/${car.id}`, {
                availableCount: aCount,
            });

            let response2 = await axios.put(`/api/reservations/${reservation?.id}`, {
                userId: reservation?.userId,
            });

            toast.success('Reservation canceled!');
            router.refresh();
        }
        catch(error: any) {
            toast.error('Error deleting the reservation!');
        }
    }

    return (
        <ReservationCard car={car} reservation={reservation} deleteReservation={deleteReservation} />
    )
}

export default ReservationCardAdmin;