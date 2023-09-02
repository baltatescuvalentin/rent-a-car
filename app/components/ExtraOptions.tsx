'use client';

import { Car } from "@prisma/client";
import { IoLogoModelS, IoMdColorFill } from 'react-icons/io';
import { BiSolidCategory, BiSolidColorFill } from 'react-icons/bi';
import { TbManualGearbox } from 'react-icons/tb';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { GiCarDoor, GiHorseHead } from 'react-icons/gi';
import { AiFillCalendar } from 'react-icons/ai';
import { BsFuelPumpFill } from 'react-icons/bs';
import CarDetailsInfo from "./CarDetailsInfo";
import { useRouter } from "next/navigation";

interface ExtraOptionsProps {
    data: Car,
}

const ExtraOptions: React.FC<ExtraOptionsProps> = ({ data }) => {

    const router = useRouter();

    return (
        <div className="lg:ml-16 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-3">
                <CarDetailsInfo label={data.category} icon={BiSolidCategory}/>
                <CarDetailsInfo label={data.type} icon={TbManualGearbox}/>
                <CarDetailsInfo label={data.fuel} icon={BsFuelPumpFill}/>
                <CarDetailsInfo label={`${data.horsePower} HP`} icon={GiHorseHead}/>
                <CarDetailsInfo label={data.year} icon={AiFillCalendar}/>
                <CarDetailsInfo label={data.color} icon={IoMdColorFill}/>
                <CarDetailsInfo label={`${data.seatsCount} seats`} icon={MdAirlineSeatReclineNormal}/>
                <CarDetailsInfo label={`${data.doorsCount} doors`} icon={GiCarDoor}/>
            </div>
            <div className="flex flex-row items-center justify-between gap-4 w-full mt-4">
                <p className="text-2xl md:text-[36px] font-bold">
                    {data.price} $/day
                </p>
                <button onClick={() => router.push(`/rent/${data.id}`)} className="text-2xl rounded-xl bg-blue-500 text-white font-semibold w-[180px] sm:w-[200px] h-[45px] lg:-translate-x-12">
                    Rent
                </button>
            </div>
        </div>
    )
}

export default ExtraOptions;