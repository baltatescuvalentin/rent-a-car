import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


interface IFavorite {
    currentUser?: User | null,
    carId: string,
}

const useFavorite = ({currentUser, carId}: IFavorite) => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const favorites = currentUser?.favoriteIds || [];
        if(favorites.includes(carId)) {
            return true;
        }

        return false;
    }, [currentUser, carId]);

    const toggleFavorite = () => {

        if(!currentUser) {
            return loginModal.onOpen();
        }

        try {

            if(hasFavorited) {
                axios.post(`/api/favorites/${carId}`, {
                    carId: carId,
                })
                    .then(() => {
                        router.refresh();
                        toast.success('Car has been deleted from favorites!');
                    })
                    .catch((error: any) => {
                        toast.error('Error trying to delete from favorites!');
                    })
            }
            else {
                axios.post(`/api/favorites`, {
                    carId: carId,
                })
                    .then(() => {
                        router.refresh();
                        toast.success('New favorite car added!');
                    })
                    .catch((error: any) => {
                        toast.error('Error trying to add new favorite!');
                    })
            }
        }
        catch(error: any) {
            toast.error('Error when trying to like/unlike the car!');
        }

    }

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;