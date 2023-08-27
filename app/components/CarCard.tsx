'use client';

import { Car } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface CarCardProps {
    data: Car,
}

const CarCard: React.FC<CarCardProps> = ({ data }) => {

    const router = useRouter();
    const params = useSearchParams();

    return (
        <div className="w-full lg:w-[300px] rounded-md border-[1px] border-neutral-200 hover:border-[2px] hover:scale-[102%] hover:border-blue-700 py-2 px-3">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
                <div className="w-full">
                    <div className="hidden lg:block text-2xl">
                        {data.category}
                    </div>
                    <Image alt={data.model} src={data.imgSrc[0]} height={0} width={0} className="h-[300px] w-[300px] sm:w-full sm:h-full"/>
                </div>
                <div className="flex flex-col justify-between w-full">
                    <p className="block lg:hidden text-2xl">
                        {data.category}
                    </p>
                    <div className="p-2 bg-neutral-200 text-xl text-semibold">
                        {data.maker} {data.model}
                    </div>
                    <div className="rounded-md bg-blue-300 text-xl w-full">
                        {data.price} $/day
                    </div>
                    <button className="rounded-md bg-blue-700 text-xl w-full">
                        Rent now!
                    </button>
                    <Link href={'/models/'+data.id} className="rounded-md bg-blue-700 text-xl w-full">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CarCard;