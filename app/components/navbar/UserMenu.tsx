'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { User } from "@prisma/client";
import { signOut } from 'next-auth/react';
import { SafeUserSelected } from '@/app/types';

interface UserMenuProps {
    currentUser?: User | null,
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const toggleOpen = () => {
        setIsOpen(value => !value);
    }

    return (
        <div className='relative'>
            <div onClick={toggleOpen} 
                className='rounded-full border-[1px] border-neutral-300 hover:shadow-md flex flex-row items-center p-2 md:py-1 md:px-2 gap-3 cursor-pointer transition'>
                <AiOutlineMenu className="hidden md:block" size={`1.25rem`}/>
                <Avatar src={null}/>
            </div>
            {isOpen && (
                <div className='absolute bg-white border-[1px] w-[40vw] md:w-[20vw] lg:w-[12vw] rounded-xl flex flex-col right-0 top-18 md:top-11'>
                    {!currentUser ? (
                        <>
                            <MenuItem label='Login' onClick={() => loginModal.onOpen()} />
                            <MenuItem label='Sign up' onClick={() => registerModal.onOpen()} />
                        </>
                        
                    ) : (
                        <>
                            <MenuItem label='My reservations' onClick={() => {}} />
                            <MenuItem label='My favorites' onClick={() => {}} />
                            <MenuItem label='Log out' onClick={() => signOut()} />
                        </>
                    )}
                    
                </div>
            )}
        </div>
    )
}

export default UserMenu;
