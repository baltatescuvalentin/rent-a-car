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

    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-5 min-h-[50.35vh]">
                <Filters models={modelsArr} makers={makersArr} fuels={fuelsArr} types={typesArr} categories={categoriesArr} currentUser={currentUser}/>
                <Models searchParams={searchParams}/>
            </div>
        </Container>
    )
}

export default ModelsPage;