'use client'

import { useSearchParams } from "next/navigation";

interface NavbarElemProps {
    label: string,
    onClick: () => void,
}

const NavbarElem: React.FC<NavbarElemProps> = ({ label, onClick }) => {

    const params = useSearchParams();

    return (
        <div onClick={onClick}
            className="text-xl md:text-2xl font-bold text-neutral-600 cursor-pointer">
            {label}
        </div>
    )
}

export default NavbarElem;