'use client';

import Image from "next/image";
import { useState } from "react";
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';


interface CarouselProps {
    images: string[],
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {

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
        <div className="flex flex-row items-center gap-3">
            <GrLinkPrevious onClick={prevImage} className="hover:cursor-pointer shadow-sm" size={42} />
            <Image className="w-[520px] h-[520px]" alt="car" src={images[index]} height={0} width={0}/>
            <GrLinkNext onClick={nextImage} className="hover:cursor-pointer shadow-sm" size={42} />
        </div>
    )
}

export default Carousel;