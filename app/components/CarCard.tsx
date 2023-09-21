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
import { useState } from "react";
import UpdateCarModal from "./modals/UpdateCarModal";
import useCarEditModal from "../hooks/useCarEditModal";

interface CarCardProps {
    data: Car,
    currentUser?: User | null,
}

const CarCard: React.FC<CarCardProps> = ({ data, currentUser }) => {

    const carEditModal = useCarEditModal();

    const router = useRouter();
    const params = useSearchParams();

    const deleteCar = () => {

        axios.delete(`/api/car/${data?.id}`)
            .then(() => {
                toast.success('Car deleted!');
                router.refresh();
            })
            .catch((error: any) => {
                toast.error('Couldn`t delete!');
            })
    }

    return (
        <>
            <div className="relative rounded-md border-[1px] border-neutral-200 shadow-sm hover:border-[2px] hover:scale-[102%] hover:border-blue-700 py-2 px-3">
                <div className="px-2 block text-2xl lg:text-[30px] text-neutral-600 font-semibold">
                    {data?.category}
                </div>
                <div className="px-2 text-2xl font-semibold text-neutral-500 break-words">
                    {data?.maker} {data?.model}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2 ">
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <Image onClick={() => router.push(`/rent/${data?.id}`)} alt="car model" src={data?.imgSrc[0]} width={0} height={0} sizes="100vw" className="h-[210px] w-[350px] sm:h-[225px] md:w-[330px] hover:cursor-pointer" />
                            {/*<img onClick={() => router.push(`/models/${data?.id}`)} alt={data?.model} src={data?.imgSrc[0]} className="h-[210px] w-[350px] sm:h-[225px] md:w-[330px] hover:cursor-pointer"/>*/}
                            {data.id !== null && !currentUser?.isAdmin && (
                                <div className="absolute top-3 left-3">
                                    <HeartButton currentUser={currentUser} carId={data.id} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly gap-3 w-full sm:w-[40%] lg:w-[170px] ">
                        
                        <div className="rounded-md bg-blue-300 text-xl text-center font-semibold">
                            {data?.price} $/day
                        </div>
                        {currentUser?.isAdmin ? (
                            <div className="flex flex-row lg:flex-col items-center gap-3">
                                <Link href={'/models/'+data?.id} className="rounded-md bg-blue-500 text-xl w-full text-center text-white">
                                    Details
                                </Link>
                                <button onClick={() => carEditModal.onOpen(data)} className="rounded-md bg-green-500 text-xl w-full text-white">
                                    Edit
                                </button>
                                <button onClick={deleteCar} className="rounded-md bg-red-600 text-xl w-full text-white">
                                    Delete!
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-row lg:flex-col items-center gap-3">
                                <Link href={'/models/'+data?.id} className="rounded-md bg-blue-500 text-xl w-full text-center text-white">
                                    Details
                                </Link>
                                <button onClick={() => router.push(`/rent/${data?.id}`)} className="rounded-md bg-blue-600 text-xl w-full text-white font-bold shadow-md">
                                    Rent
                                </button>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarCard;