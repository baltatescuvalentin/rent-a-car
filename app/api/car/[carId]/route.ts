import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


interface CarParam {
    carId?: string,
}

export async function DELETE(request: Request, { param }: {param: CarParam}) {
    const currentUser = await getCurrentUser();

    if(!currentUser?.isAdmin) {
        return NextResponse.error();
    }

    const { carId } = param;

    if(!carId || typeof carId === 'string') {
        throw new Error('Invalid ID!');
    }

    const car = await prisma.car.delete({
        where: {
            id: carId,
        }
    });

    return NextResponse.json(car);
}