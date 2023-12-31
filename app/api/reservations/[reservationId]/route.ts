import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IReservation {
    reservationId: string,
}

export async function DELETE(request: Request, { params }: {params: IReservation}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.json({
            message: "Not allowerd",
        }, {
            status: 401,
        })
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            userId: currentUser.id,
        }
    })

    return NextResponse.json(reservation, { status: 201 });
}

export async function PUT(request: Request, { params }: {params: IReservation}) {
    const currentUser = await getCurrentUser();

    if(!currentUser || !currentUser.isAdmin) {
        return NextResponse.json({
            message: "Not allowerd",
        }, {
            status: 401,
        })
    }

    const { reservationId } = params;

    const body = await request.json();
    const { userId } = body;

    if(!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            userId: userId,
        }
    })

    return NextResponse.json(reservation, { status: 201 });
}