import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
    const body = await request.json();

    const {
        gps,
        babySeat,
        childSeat,
        wifi,
        skiSupport,
        bikeSupport,
        snowChains,
        reservationId,
        carId,
    } = body;

    const carOptions = await prisma.carOptions.create({
        data: {
            carId,
            reservationId,
            gps,
            wifi,
            babySeat,
            childSeat,
            skiSupport,
            bikeSupport,
            snowChains
        }
    })

    return NextResponse.json(carOptions);
}