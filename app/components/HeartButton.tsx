'use client';

import { User } from '@prisma/client';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorites';
import useLoginModal from '../hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface HeartButtonProps {
    carId: string,
    currentUser?: User | null,
    small?: string,
}

const HeartButton: React.FC<HeartButtonProps> = ({ carId, currentUser, small }) => {

    console.log('heart');
    console.log(carId);

    const loginModal = useLoginModal();
    const router = useRouter();

    const {
        hasFavorited,
        toggleFavorite
    } = useFavorite({
        currentUser,
        carId,
    });

    /*const hasFavorited = () => {
        const favorites = currentUser?.favoriteIds;
        return favorites?.includes(carId);
    }

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModal.onOpen();
        }

            const hf = hasFavorited();
            if(hf) {
                axios.delete(`/api/favorites/${carId}`)
                    .then(() => {
                        router.refresh();
                        toast.success('Car has been deleted from favorites!');
                    })
                    .catch((error: any) => {
                        toast.error(error);
                    })
            }
            else {
                axios.post(`/api/favorites/${carId}`)
                    .then(() => {
                        router.refresh();
                        toast.success('New favorite car added!');
                    })
                    .catch((error: any) => {
                        toast.error(error);
                    })
            }
    }*/

    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 cursor-pointer transition">
            <AiOutlineHeart className="fill-neutral-200 absolute -top-[2px] -left-[2px]" size={small ? 28 : 34}/>
            <AiFillHeart size={small ? 24 : 30} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-600'}`}/>
        </div>
    )
}

export default HeartButton;