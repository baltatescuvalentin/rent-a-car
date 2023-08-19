'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';

const Logo = () => {

    const router = useRouter();

    return (
        <div onClick={() => router.push('/')} className="relative  cursor-pointer">
            <Image 
                 alt="logo" src="/images/logo.png" width="200" height="150"/>
            <div className="absolute font-extrabold italic text-[#343a40] text-2xl -translate-y-10 translate-x-1/3 z-10">
                Rent-a-car
            </div>
        </div>
    )
}

export default Logo;