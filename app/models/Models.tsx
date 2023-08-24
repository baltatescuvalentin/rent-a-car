import { toast } from "react-hot-toast";
import getCars, { CarsParams } from "../actions/getCars";
//import { SafeCar } from "@/app/types";


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

    const cars = await getCars(carsParams);
    console.log('cars from db');
    console.log(cars);

    return (
        <div>

        </div>
    )
}

export default Models;