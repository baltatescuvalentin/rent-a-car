'use client'

import Container from "../Container";
import Logo from "./Logo";
import { useRouter } from 'next/navigation';
import UserMenu from "./UserMenu";
import NavbarElem from "./NavbarElem";
import { User } from "@prisma/client";

interface NavbarProps {
    currentUser?: User | null,
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

    const router = useRouter()

    return (
        <div className="w-full bg-white shadow-sm">
            <div className="border-b-[1px] py-4">
                <Container>
                    <div className="flex flex-col justify-center gap-2">
                        <div className="flex flex-row items-center justify-between gap-3">
                            <Logo />
                            <UserMenu currentUser={currentUser}/>
                        </div>
                        {/** <div className="flex flex-row items-center justify-between">
                            <NavbarElem label="Home" onClick={() => {}} />
                            <NavbarElem label="Models" onClick={() => {}} />
    </div> */}
                        
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar;