import prisma from '@/app/libs/prismadb';

export default async function getCarsFeatures() {
    try {
        const allCars = await prisma.car.findMany({
            select: {
                model: true,
                maker: true,
                fuel: true,
                type: true,
                category: true,
            }
        })

        const models = new Set();
        allCars.forEach((car) => models.add(car.model));
        const modelsArr = Array.from(models) as string[];
        const makers = new Set();
        allCars.forEach((car) => makers.add(car.maker));
        const makersArr = Array.from(makers) as string[];
        const fuels = new Set();
        allCars.forEach((car) => fuels.add(car.fuel));
        const fuelsArr = Array.from(fuels) as string[];
        const types = new Set();
        allCars.forEach((car) => types.add(car.type));
        const typesArr = Array.from(types) as string[];
        const categories = new Set();
        allCars.forEach((car) => categories.add(car.category));
        const categoriesArr = Array.from(categories) as string[];

        return {
            modelsArr,
            makersArr,
            fuelsArr,
            typesArr,
            categoriesArr,
        };
    }
    catch(error: any) {
        throw new Error(error);
    }
}