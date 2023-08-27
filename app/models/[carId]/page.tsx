import getCarById from "@/app/actions/getCarById";
import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ExtraOptions from "@/app/components/ExtraOptions";
import ModelClient from "./ModelClient";

interface ICarPage {
    carId?: string,
}

const CarPage = async ({ params }: { params: ICarPage }) => {

    console.log(params);

    const currCar = await getCarById(params);

    if(!currCar) {
        return (
            <EmptyState />
        )
    }

    return (
        <Container>
            <div className="flex flex-col lg:flex-row items-center gap-4">
                <Carousel images={currCar.imgSrc} />
                <ExtraOptions data={currCar} />
            </div>
        </Container>
    )
}

export default CarPage;