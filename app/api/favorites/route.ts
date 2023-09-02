import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {

    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { carId } = body;

    if(!currentUser) {
        return NextResponse.error();
    }

    if(!carId || typeof carId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favorites = [...(currentUser.favoriteIds || [])];
    favorites.push(carId);

    const newFavorites = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds: favorites,
        }
    })

    return NextResponse.json(newFavorites);
}