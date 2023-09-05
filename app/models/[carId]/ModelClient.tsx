import getCarById from "@/app/actions/getCarById";
import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ExtraOptions from "@/app/components/ExtraOptions";


interface ModelClientProps {
    searchParams: { [key: string]: string | string[] | undefined },
}

const ModelClient: React.FC<ModelClientProps> = async ({ searchParams }) => {

    return (
        <></>
    )
}

export default ModelClient;