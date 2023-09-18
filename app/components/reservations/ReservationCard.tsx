'use client';

import { Car, Reservation } from "@prisma/client";
import { SafeReservation } from "../../types";
import CarCard from "../CarCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiPersonSimpleBikeBold } from 'react-icons/pi';
import { MdGpsFixed } from 'react-icons/md';
import { FaBaby, FaChild, FaSkiing } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsSnow } from 'react-icons/bs';
import { AiFillCalendar } from 'react-icons/ai';
import ReservationExtra from "./ReservationExtra";
import Image from 'next/image';


interface ReservationCardProps {
    reservation?: SafeReservation | null,
    car: Car,
    deleteReservation: () => void,
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, car, deleteReservation }) => {

    const [openDetails, setOpenDetails] = useState(false);
    const router = useRouter();

    const handleDetails = () => {
        setOpenDetails(prev => !prev);
    }

    return (
        <div className="rounded-lg border-[1px] border-blue-500">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-1 md:gap-3 py-2 px-3 ">
                <div className="flex flex-col items-center">
                    <p className="text-base md:text-xl font-bold text-center">
                        {car?.maker}
                    </p>
                    <p className="text-base md:text-xl font-bold text-center">
                        {car?.model} 
                    </p>
                </div>
                <div className="flex-row items-center gap-2 hidden md:flex w-[120%]">
                    <AiFillCalendar size={28}/>
                    <div className="flex flex-col lg:flex-row items-center lg:gap-2">
                        <p className="text-base sm:text-lg font-semibold">
                            {reservation?.startDate.slice(0, 10)}
                        </p>
                        <p className="text-base sm:text-lg font-semibold">
                            {reservation?.endDate.slice(0, 10)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end">
                    <button onClick={handleDetails} className="bg-neutral-400 text-white font-bold rounded-lg w-[100px] py-1">
                        Details
                    </button>
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={deleteReservation} className="bg-blue-500 hidden sm:block text-white font-bold rounded-lg w-[100px] py-1">
                        Cancel
                    </button>
                </div>
            </div>
            <hr />
            {openDetails && (
                <div className="grid grid-cols-1 lg:grid-cols-5 items-center px-3 gap-3 lg:gap-5">
                    <Image alt="car" src={car.imgSrc[0]} className="h-[200px] w-full xs:w-[80%] sm:h-[250px] sm:w-[375px] justify-self-center lg:col-span-2" height={0} width={0} sizes="100vw"/>
                    <div className="flex-row items-center gap-2 flex md:hidden w-[120%]">
                        <AiFillCalendar size={28}/>
                        <div className="flex flex-col lg:flex-row items-center lg:gap-2">
                            <p className="text-base sm:text-lg font-semibold">
                                {reservation?.startDate.slice(0, 10)}
                            </p>
                            <p className="text-base sm:text-lg font-semibold">
                                {reservation?.endDate.slice(0, 10)}
                            </p>
                        </div>
                    </div>
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
                        <p className="text-[22px] sm:text-[24px] font-bold lg:mb-3">
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
                        <p className="text-[26px] md:text-[32px] font-bold">
                            Total
                        </p>
                        <p className="text-[26px] md:text-[32px] font-bold">
                            {reservation?.totalPrice}$
                        </p>
                    </div>
                    <div className="flex items-center sm:hidden mb-2">
                        <button onClick={deleteReservation} className="bg-blue-500 text-white font-bold rounded-lg w-full py-1">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReservationCard;