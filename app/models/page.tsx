import getCarsFeatures from "../actions/getCarsFeatures";
import Container from "../components/Container";
import Filters from "./Filters";


const ModelsPage = async () => {

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
                <Filters models={modelsArr} makers={makersArr} fuels={fuelsArr} types={typesArr} categories={categoriesArr}/>
                
            </div>
        </Container>
    )
}

export default ModelsPage;