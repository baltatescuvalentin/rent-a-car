import { IconType } from "react-icons";


interface ReservationExtraProps {
    icon: IconType,
    label?: string | number,
}

const ReservationExtra: React.FC<ReservationExtraProps> = ({ icon: Icon, label }) => {
    return (
        <div className="flex flex-row items-center gap-1">
            <Icon className="h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] fill-blue-500"/>
            <p className="text-[20px] sm:text-[24px] font-semibold">
                {label}
            </p>
        </div>
    )
}

export default ReservationExtra;