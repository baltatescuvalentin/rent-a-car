
import { toast } from "react-hot-toast";
import getCars, { CarsParams } from "../actions/getCars";
import CarCard from "../components/CarCard";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";


interface ModelsProps {
    searchParams: { [key: string]: string | string[] | undefined },
}

const Models: React.FC<ModelsProps> = async ({ searchParams }) => {

    const carsParams: CarsParams = {}
    const categories: string[] = [], fuels: string[] = [], makers: string[] = [], types: string[] = [];

    const getValuesFromSearchParams = (param: string | undefined | string[], arr: string[]) => {
        if(typeof param === "undefined") {
            return;
        }
        if(typeof param === 'string') {
            arr.push(param);
        }
        else if(typeof param === 'object') {
            for(let i = 0; i < param.length; i++) {
                arr.push(param[i]);
            }
        }
    }

    getValuesFromSearchParams(searchParams['categories'], categories);
    getValuesFromSearchParams(searchParams['fuels'], fuels);
    getValuesFromSearchParams(searchParams['makers'], makers);
    getValuesFromSearchParams(searchParams['types'], types);
    
    categories.length > 0 && (carsParams.categories=categories)
    fuels.length > 0 && (carsParams.fuels=fuels)
    types.length > 0 && (carsParams.types=types)
    makers.length > 0 && (carsParams.makers=makers)

    const carsDB = await getCars(carsParams);
    const currentUser = await getCurrentUser();

    if(!carsDB) {
        return <EmptyState />
    }

    const cars = Array.from(carsDB);

    console.log('cars from db');
    console.log(cars);

    return (
        <div className="w-full">
            <div className="flex flex-row items-center gap-3 justify-between mb-2">
                <div className="w-full h-[5px] bg-green-400">
                </div>
                <div className="text-2xl font-bold text-green-400">
                    Models
                </div>
                <div className="w-full h-[5px] bg-green-400">
                </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full flex-wrap justify-evenly gap-5">
                {carsDB.map((car) => <CarCard key={car.id} data={car} currentUser={currentUser}/>)}
            </div>
        </div>
    )
}

export default Models;