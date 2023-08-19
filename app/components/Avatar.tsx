'use client'

import Image from 'next/image';

interface AvatarProps {
    src: string | null | undefined,
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {



    return (
        <Image className='hidden md:block rounded-full' height={30} width={30} alt="avatar" src={src || `/images/placeholder.jpg`} />
    )
}

export default Avatar;