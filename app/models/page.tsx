import getCars, { CarsParams } from "../actions/getCars";
import getCarsFeatures from "../actions/getCarsFeatures";
import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import Filters from "./Filters";
import Models from "./Models";

const ModelsPage = async ({
    params,
    searchParams,
}: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const allCars = await getCarsFeatures();
    const currentUser = await getCurrentUser();

    const {
        makersArr,
        modelsArr,
        fuelsArr,
        typesArr,
        categoriesArr
    } = await getCarsFeatures();

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

    return (
        <Container>
            <div className="flex flex-col lg:flex-row gap-5 min-h-[50.35vh]">
                <Filters carsParams={carsParams} models={modelsArr} makers={makersArr} fuels={fuelsArr} types={typesArr} categories={categoriesArr} currentUser={currentUser}/>
                <Models carsDB={carsDB} currentUser={currentUser}/>
            </div>
        </Container>
    )
}

export default ModelsPage;
