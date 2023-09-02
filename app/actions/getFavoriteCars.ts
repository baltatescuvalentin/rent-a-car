import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteCars() {

    try{
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return [];
        }

        const favorites = currentUser?.favoriteIds;

        const favoriteCars = await prisma.car.findMany({
            where: {
                id: {
                    in: [...(favorites || [])]
                }
            }
        });

        return favoriteCars;
    }
    catch(error: any) {
        throw new Error(error);
    }
}