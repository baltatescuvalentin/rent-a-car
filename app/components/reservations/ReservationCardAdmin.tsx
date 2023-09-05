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


interface ReservationCardAdminProps {
    reservation?: SafeReservation | null,
    car: Car,
}

const ReservationCardAdmin: React.FC<ReservationCardAdminProps> = ({ reservation, car }) => {

    const [openDetails, setOpenDetails] = useState(false);
    const router = useRouter();

    const handleDetails = () => {
        setOpenDetails(prev => !prev);
    }

    console.log(car);
    console.log(reservation);

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
            toast.error(error);
        }

        /*axios.post(`/api/car/${car.id}`, {
            availableCount: car.availableCount + 1
        })
            .then(() => {

            })
            .catch((error: any) => {
                toast.error(error);
            })

        axios.delete(`/api/reservations/${reservation?.id}`)
            .then(() => {
                toast.success('Reservation canceled!');
                router.refresh();
            })
            .catch((error: any) => {
                toast.error(error);
            })*/
    }

    return (
        <div className="rounded-lg border-[1px] border-blue-500">
            <div className="grid grid-cols-3 md:grid-cols-4 items-center justify-center gap-3 py-2 px-3 ">
                <div className="flex flex-col items-center">
                    <p className="text-xl font-bold">
                        {car?.maker}
                    </p>
                    <p className="text-xl font-bold">
                        {car?.model} 
                    </p>
                </div>
                <div className="flex-row items-center gap-2 hidden md:flex w-[120%]">
                    <AiFillCalendar size={28}/>
                    <div className="flex flex-col lg:flex-row items-center lg:gap-2">
                        <p className="text-lg font-semibold">
                            {reservation?.startDate.slice(0, 10)}
                        </p>
                        <p className="text-lg font-semibold">
                            {reservation?.endDate.slice(0, 10)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={handleDetails} className="bg-neutral-400 text-white font-bold rounded-lg w-[100px] py-1">
                        Details
                    </button>
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={deleteReservation} className="bg-blue-500 text-white font-bold rounded-lg w-[100px] py-1">
                        Cancel
                    </button>
                </div>
            </div>
            <hr />
            {openDetails && (
                <div className="grid grid-cols-1 lg:grid-cols-5 items-center px-3 gap-3 lg:gap-5">
                    <img alt="car" src={car.imgSrc[0]} className="h-[200px] w-full sm:h-[250px] sm:w-[350px] justify-self-center lg:col-span-2"/>
                    <div className="flex flex-col items-start gap-1 md:gap-3">
                        <p className="text-[22px] sm:text-[28px] font-bold text-neutral-700">
                            Extra options
                        </p>
                        <div className="flex flex-row flex-wrap gap-3">
                            {reservation?.gps && (
                                <ReservationExtra label="GPS" icon={MdGpsFixed}/>
                            )}
                            {reservation?.wifi && (
                                <ReservationExtra label="WiFi" icon={AiOutlineWifi}/>
                            )}
                            {reservation?.babySeat && (
                                <ReservationExtra label="Baby Seat" icon={FaBaby}/>
                            )}
                            {reservation?.childSeat && (
                                <ReservationExtra label="Child Seat" icon={FaChild}/>
                            )}
                            {reservation?.snowChains && (
                                <ReservationExtra label="Snow Chains" icon={BsSnow}/>
                            )}
                            {reservation?.skiSupport && (
                                <ReservationExtra label="Ski Support" icon={FaSkiing}/>
                            )}
                            {reservation?.bikeSupport && (
                                <ReservationExtra label="Bike Support" icon={PiPersonSimpleBikeBold}/>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-[24px] font-bold lg:mb-3">
                            Additional info
                        </p>
                        <p className="text-[20px] font-semibold">
                            Telephone: <span>{reservation?.phoneNumber}</span>
                        </p>
                        <p className="text-[20px] font-semibold">
                            Email: <span>{reservation?.email}</span>
                        </p>
                        <p className="text-[20px] font-semibold">
                            Remarks: <span>{reservation?.remarks}</span>
                        </p>
                    </div>
                    <div className="flex flex-row lg:flex-col items-center gap-1">
                        <p className="text-[28px] md:text-[32px] font-bold">
                            Total
                        </p>
                        <p className="text-[28px] md:text-[32px] font-bold">
                            {reservation?.totalPrice}$
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReservationCardAdmin;