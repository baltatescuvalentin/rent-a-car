'use client';

import Image from "next/image";
import { useState } from "react";
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import HeartButton from "./HeartButton";
import { User } from "@prisma/client";


interface CarouselProps {
    images: string[],
    carId: string,
    currentUser?: User | null,
}

const Carousel: React.FC<CarouselProps> = ({ images, carId, currentUser }) => {

    const imgLength = images.length;

    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev + 1 ) % imgLength);
    }

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + imgLength) % imgLength);
    }

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3 relative">
                <button className="outline-none">
                    <GrLinkPrevious onClick={prevImage} className="hover:cursor-pointer shadow-sm w-[20px] h-[20px] md:w-[42px] md:h-[42px]" />
                </button>
                <Image className="h-[180px] w-[270px] sm:w-[375px] sm:h-[250px] md:h-[350px] md:w-[550px] lg:w-[475px] xl:w-[550px]" alt={`car-img-${index}`} src={images[index]} width={0} height={0} sizes="100vw"/>
                <button className="outline-none">
                    <GrLinkNext onClick={nextImage} className="hover:cursor-pointer shadow-sm w-[20px] h-[20px] md:w-[42px] md:h-[42px]" />
                </button>
            </div>
            {!currentUser?.isAdmin && (
                <div className="absolute top-3 left-14">
                    <HeartButton currentUser={currentUser} carId={carId} />
                </div>
            )}
        </div>
    )
}

export default Carousel;