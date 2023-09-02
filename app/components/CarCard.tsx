'use client';

import { Car, User } from "@prisma/client";
import axios from "axios";
import Image from 'next/image';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { ICar } from "../api/car/[carId]/route";
import { SafeUserSelected } from "../types";
import HeartButton from "./HeartButton";

interface CarCardProps {
    data: Car,
    currentUser?: User | null,
}

const CarCard: React.FC<CarCardProps> = ({ data, currentUser }) => {


    const router = useRouter();
    const params = useSearchParams();
    console.log(data?.id);

    const deleteCar = () => {
        /*const deleteReservation = () => {
            axios.delete(`/api/reservations/${reservation?.id}`)
                .then(() => {
                    toast.success('Reservation canceled!');
                })
                .catch((error: any) => {
                    toast.error(error);
                })
        }*/

        axios.delete(`/api/car/${data?.id}`)
            .then(() => {
                toast.success('Car deleted!');
                router.refresh();
            })
            .catch((error: any) => {
                toast.error(error);
            })
    }

    return (
        <div className="relative rounded-md border-[1px] border-neutral-200 shadow-sm hover:border-[2px] hover:scale-[102%] hover:border-blue-700 py-2 px-3">
            <div className="flex flex-col md:flex-row gap-2 ">
                <div className="">
                    <div className="p-2 block text-2xl lg:text-[30px] text-neutral-600 font-semibold">
                        {data?.category}
                    </div>
                    <div className="relative">
                        <img onClick={() => router.push(`/models/${data?.id}`)} alt={data?.model} src={data?.imgSrc[0]} className="h-[200px] w-full sm:h-[300px] md:h-[225px] md:w-[330px] hover:cursor-pointer"/>
                        {data.id !== null && (
                            <div className="absolute top-3 left-3">
                                <HeartButton currentUser={currentUser} carId={data.id} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-3 w-full md:w-auto ">
                    
                    <div className="p-2 text-2xl font-semibold text-neutral-500">
                        {data?.maker} {data?.model}
                    </div>
                    <div className="rounded-md bg-blue-300 text-xl text-center">
                        {data?.price} $/day
                    </div>
                    <div className="flex flex-row lg:flex-col items-center gap-3">
                        <Link href={'/models/'+data?.id} className="rounded-md bg-blue-600 text-xl w-full text-center text-white">
                            Details
                        </Link>
                        <button onClick={() => router.push(`/rent/${data?.id}`)} className="rounded-md bg-blue-600 text-xl w-full text-white">
                            Rent
                        </button>
                    </div>
                    {currentUser?.isAdmin && (
                        <div className="flex flex-row lg:flex-col items-center gap-3">
                            <button className="rounded-md bg-neutral-600 text-xl w-full text-white">
                                Edit
                            </button>
                            <button onClick={deleteCar} className="rounded-md bg-red-600 text-xl w-full text-white">
                                Delete!
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarCard;