import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IFavorite {
    carId?: string,
}

export async function POST(request: Request) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { carId } = body;
    console.log('route');
    console.log(carId);

    if(!carId ) {
        throw new Error('Invalid ID');
    }

    let favorites = [...(currentUser.favoriteIds || [])];
    favorites = favorites.filter((fav) => fav != carId);

    const newFavorites = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds: favorites
        }
    });

    return NextResponse.json(newFavorites);
}