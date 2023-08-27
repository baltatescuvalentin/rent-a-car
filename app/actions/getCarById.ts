import prisma from '@/app/libs/prismadb';

interface IParams {
    carId?: string,
}

export default async function getCarById(params: IParams) {
    try {
        const { carId } = params;

        const car = await prisma.car.findUnique({
            where: {
                id: carId,
            }
        })

        if(!car) {
            return null;
        }

        return car;
    }
    catch(error: any) {
        throw new Error(error);
    }
}