import prisma from '@/app/libs/prismadb';

interface IReservations {
    carId?: string,
    userId?: string,
}

export default async function getReservations(params: IReservations) {
    try {
        const {
            carId,
            userId,
        } = params;

        let query: any = {}

        if(carId) {
            query.carId = carId;
        }
        
        if(userId) {
            query.userId = userId;
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                car: true,
            },
            orderBy: {
                createdAt: 'asc',
            }
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
        }))

        return safeReservations;
    }
    catch(error: any) {
        throw new Error(error);
    }


}