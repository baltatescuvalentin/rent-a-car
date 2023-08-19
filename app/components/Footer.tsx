'use client'

import { useRouter } from 'next/navigation';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { AiFillLinkedin, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';


const Footer = () => {

    const router = useRouter();

    return (
        <div className="bg-[#343a40] flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-12 py-2 md:py-4">
            <div className='flex flex-col items-center justify-center'>
                <p className='text-lg md:text-2xl font-bold text-white'>
                    Find us anywhere!
                </p>
                <p className='text-base md:text-xl font-semibold text-white'>
                    Phone: +40 000 00 00 00
                </p>
                <p className='text-base md:text-xl font-semibold text-white'>
                    Email: reservations@retacar.com
                </p>
                <div className='flex flex-row items-center justify-center gap-4'>
                    <AiFillLinkedin className="fill-white hover:cursor-pointer" size={32}/>
                    <AiFillFacebook className="fill-white hover:cursor-pointer" size={32}/>
                    <AiFillInstagram className="fill-white hover:cursor-pointer" size={32}/>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-lg md:text-2xl text-white font-semibold'>
                    Company
                </p>
                <div className='text-white'>
                    ---------------------------
                </div>
                <p className='text-base md:text-lg text-white font-semibold hover:cursor-pointer'>
                    Anti-corruption and anti-bribery policy
                </p>
                <p className='text-base md:text-lg text-white font-semibold hover:cursor-pointer'>
                    Anti-slavery and human trafficking policy
                </p>
                <p className='text-base md:text-lg text-white font-semibold hover:cursor-pointer text-center'>
                    Integrated quality - environment - work safety policy
                </p>
            </div>
        </div>
    )
}

export default Footer;