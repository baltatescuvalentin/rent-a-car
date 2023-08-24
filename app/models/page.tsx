import { useState } from "react";
import getCarsFeatures from "../actions/getCarsFeatures";
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

    {/*const [types, setTypes] = useState<string[]>([]);
    const [makers, setMakers] = useState<string[]>([]);
    const [fuels, setFuels] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const applyFilters = (types: string[], makers: string[], fuels: string[], categories: string[]) => {
        setTypes(types);
        setMakers(makers);
        setFuels(fuels);
        setCategories(categories);
    }

    console.log(makers);
console.log(categories);*/}

    const allCars = await getCarsFeatures();
    const {
        makersArr,
        modelsArr,
        fuelsArr,
        typesArr,
        categoriesArr
    } = await getCarsFeatures();

    return (
        <Container>
            <div className="flex flex-col sm:flex-row gap-5 min-h-[50.35vh]">
                <Filters models={modelsArr} makers={makersArr} fuels={fuelsArr} types={typesArr} categories={categoriesArr} />
                <Models searchParams={searchParams}/>
            </div>
        </Container>
    )
}

export default ModelsPage;