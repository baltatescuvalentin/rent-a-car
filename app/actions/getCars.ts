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

        const query: any = {
            OR: [

            ]
        };

        if(models) {
            query.OR.push(...models.map((model) => ({
                model: model,
            })))
        }

        if(makers) {
            query.OR.push(...makers.map((maker) => ({
                maker: maker,
            })))
        }

        if(types) {
            query.OR.push(...types.map((type) => ({
                type: type,
            })))
        }

        if(categories) {
            query.OR.push(...categories.map((category) => ({
                category: category,
            })))
        }

        if(fuels) {
            query.OR.push(...fuels.map((fuel) => ({
                fuel: fuel,
            })))
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