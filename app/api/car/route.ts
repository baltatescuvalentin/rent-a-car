import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {

    const currentUser = await getCurrentUser();
    const isAdmin = currentUser?.isAdmin;

    if(!isAdmin) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {
        model,
        maker,
        year,
        color,
        seatsCount,
        doorsCount,
        category,
        type,
        fuel,
        price,
        availableCount,
        horsePower,
        imageSrc,
    } = body;

    const car = await prisma.car.create({
        data: {
            model,
            maker,
            year: parseInt(year),
            color,
            seatsCount: parseInt(seatsCount),
            doorsCount: parseInt(doorsCount),
            category,
            type,
            fuel,
            price: parseInt(price),
            availableCount: parseInt(availableCount),
            horsePower: parseInt(horsePower),
            imgSrc: imageSrc,
        }
    })

    return NextResponse.json(car);
}