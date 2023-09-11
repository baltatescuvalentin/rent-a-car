import prisma from '@/app/libs/prismadb';

export interface CarsParams {
    models?: string[],
    makers?: string[],
    types?: string[],
    categories?: string[],
    fuels?: string[],
}

export default async function getCars(params: CarsParams) {
    try {
        const {
            models,
            makers,
            types,
            categories,
            fuels,
        } = params;

        const query: any = {};

        if(models) {
            query.model = {in: models};
        }

        if(makers) {
            query.maker = {in: makers};
        }

        if(types) {
            query.type = {in: types};
        }

        if(categories) {
            query.category = {in: categories};
        }

        if(fuels) {
            query.fuel = {in: fuels};
        }

        const cars = await prisma.car.findMany({
            where: query,
        })

        return cars;
    }
    catch(error: any) {
        throw new Error(error);
    }

}