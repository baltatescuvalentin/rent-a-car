import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export interface ICar {
    carId: string,
}

export async function DELETE(request: Request, { params }: {params: ICar}) {

    const { carId } = params;

    if(!carId) {
        throw new Error('Invalid ID!');
    }

    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser?.isAdmin) {
        return NextResponse.error();
    }

    const car = await prisma.car.deleteMany({
        where: {
            id: carId,
        }
    });

    return NextResponse.json(car);
}


export async function POST(request: Request, {params}: {params: ICar}) {

    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser?.isAdmin) {
        return NextResponse.error();
    }

    const { carId } = params;

    if(!carId) {
        throw new Error('Invalid ID!');
    }

    const body = await request.json();
    const { availableCount } = body;
    
    const updatedCar = await prisma.car.update({
        where: {
            id: carId,
        },
        data: {
            availableCount: availableCount,
        }
    })

    return NextResponse.json(updatedCar);
}