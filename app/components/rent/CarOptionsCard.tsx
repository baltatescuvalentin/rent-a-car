import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";


interface CarOptionsCardProps {
    label: string,
    title: string,
    icon: IconType,
    price: number,
    register: UseFormRegister<FieldValues>,
    isLoading: boolean,
}

const CarOptionsCard: React.FC<CarOptionsCardProps> = ({ label, icon: Icon, price, register, title, isLoading }) => {
    return (
        <div className="border-[2px] w-full md:w-[400px] border-neutral-400 flex flex-row items-center justify-between px-3 py-1 gap-3">
            <div className="flex flex-row items-center">
                <Icon className="fill-blue-400" size={56}/>
                <div className="flex flex-col items-start justify-center py-1 sm:py-4 ml-2">
                    <p className="text-2xl text-blue-500">
                        {title}
                    </p>
                    <p className="text-[20px] text-neutral-500">
                        {price} $/day
                    </p>
                </div>
            </div>
            <input type="checkbox" className="scale-[300%] mr-5" disabled={isLoading} {...register(label)}/>
        </div>
    )
}

export default CarOptionsCard;