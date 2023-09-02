import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const {
        carId,
        startDate,
        endDate,
        totalPrice,
        fullName,
        email,
        phoneNumber,
        remarks,
        gps,
        wifi,
        babySeat,
        childSeat,
        snowChains,
        skiSupport,
        bikeSupport,
    } = body;

    const reservation = await prisma.reservation.create({
        data: {
            userId: currentUser?.id,
            carId,
            startDate,
            endDate,
            totalPrice,
            fullName,
            email,
            phoneNumber,
            remarks,
            gps,
            wifi,
            babySeat,
            childSeat,
            snowChains,
            skiSupport,
            bikeSupport,
        }
    })

    return NextResponse.json(reservation);
}