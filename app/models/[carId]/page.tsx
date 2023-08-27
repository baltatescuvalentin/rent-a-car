import getCarById from "@/app/actions/getCarById";
import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ExtraOptions from "@/app/components/ExtraOptions";
import ModelClient from "./ModelClient";

interface ICarPage {
    carId?: string,
}

const CarPage = async ({
    params,
    searchParams,
}: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    return (
        <ModelClient searchParams={searchParams}/>
    )
}

export default CarPage;