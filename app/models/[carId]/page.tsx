import getCarById from "@/app/actions/getCarById";
import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ExtraOptions from "@/app/components/ExtraOptions";
import ModelClient from "./ModelClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ICarPage {
    carId?: string,
}

const CarPage = async ({ params }: { params: ICarPage }) => {

    const currCar = await getCarById(params);
    const currentUser = await getCurrentUser();

    if(!currCar || !params.carId) {
        return (
            <EmptyState />
        )
    }

    return (
        <div className="min-h-[50.5vh]">
            <Container>
                <div>
                    <p className="font-bold text-[28px] md:text-[48px] ml-4 lg:ml-16 md:ml-8">
                        {currCar.maker} {currCar.model}
                    </p> 
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:ml-16 md:ml-6">
                        <Carousel carId={params.carId} images={currCar.imgSrc} currentUser={currentUser}/>
                        <ExtraOptions data={currCar} currentUser={currentUser}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CarPage;