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

    console.log(images);

    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev + 1 ) % imgLength);
        console.log(index);
    }

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + imgLength) % imgLength);
        console.log(index);
    }

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3 relative">
                <GrLinkPrevious onClick={prevImage} className="hover:cursor-pointer shadow-sm w-[20px] h-[20px] md:w-[42px] md:h-[42px]" />
                <img className="h-[180px] w-[275px] md:h-[350px] md:w-[550px]" alt={`car-img-${index}`} src={images[index]} />
                <GrLinkNext onClick={nextImage} className="hover:cursor-pointer shadow-sm w-[20px] h-[20px] md:w-[42px] md:h-[42px]" />
            </div>
            <div className="absolute top-3 left-14">
                <HeartButton currentUser={currentUser} carId={carId} />
            </div>
        </div>
    )
}

export default Carousel;