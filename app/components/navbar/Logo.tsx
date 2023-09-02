'use client'

import useCarsFilterModal from "@/app/hooks/useCarsFilter";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';

const Logo = () => {

    const router = useRouter();
    const filtersModal = useCarsFilterModal();
    const pathname = usePathname();

    return (
        <div onClick={filtersModal.onOpen} className="flex flex-row items-center gap-2">
            {/*pathname === '/models' && (
                <div className="md:hidden rounded-full border-[1px] border-neutral-300 flex flex-row items-center p-2 transition">
                    <AiOutlineMenu size={28}/>
                </div>
            )*/}
            <div onClick={() => router.push('/')} className="relative  cursor-pointer">
                <img 
                    alt="logo" src="/images/logo.png" width="200" height="150"/>
                <div className="absolute font-extrabold italic text-[#343a40] text-2xl -translate-y-10 translate-x-1/3 z-10">
                    Rent-a-car
                </div>
            </div>
        </div>
        
    )
}

export default Logo;