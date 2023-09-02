import { IconType } from "react-icons";


interface CarDetailsInfoProps {
    icon: IconType,
    label?: string | number,
}

const CarDetailsInfo: React.FC<CarDetailsInfoProps> = ({ icon: Icon, label }) => {
    return (
        <div className="flex flex-row items-center gap-2 lg:mr-16">
            <Icon className="h-[24px] w-[24px] md:h-[32px] md:w-[32px]"/>
            <p className="text-[24px] md:text-[30px] font-semibold">
                {label}
            </p>
        </div>
    )
}

export default CarDetailsInfo;