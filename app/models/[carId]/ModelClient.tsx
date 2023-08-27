import getCarById from "@/app/actions/getCarById";
import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ExtraOptions from "@/app/components/ExtraOptions";


interface ModelClientProps {
    searchParams: { [key: string]: string | string[] | undefined },
}

const ModelClient: React.FC<ModelClientProps> = async ({ searchParams }) => {

    console.log(searchParams);
    const { carId } = searchParams;

    const currCar = await getCarById(carId);

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

export default ModelClient;