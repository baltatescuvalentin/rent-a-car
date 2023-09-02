import { FieldValues, UseFormRegister } from "react-hook-form";
import { TbGps } from 'react-icons/tb';
import { PiPersonSimpleBikeBold } from 'react-icons/pi';
import { MdGpsFixed } from 'react-icons/md';
import { FaBaby, FaChild, FaSkiing } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { BsSnow } from 'react-icons/bs';
import { LuBike } from 'react-icons/lu';
import { PRICES } from "@/app/others/constants";
import CarOptionsCard from "./CarOptionsCard";



interface CarOptionsProps {
    register: UseFormRegister<FieldValues>,
    isLoading: boolean,
}

const CarOptions: React.FC<CarOptionsProps> = ({ register, isLoading }) => {
    return (
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-evenly gap-4">
            <CarOptionsCard label='gps' title='GPS' icon={MdGpsFixed} price={PRICES.gps} register={register} isLoading={isLoading}/>
            <CarOptionsCard label='wifi' title='WiFi Router' icon={AiOutlineWifi} price={PRICES.wifi} register={register}  isLoading={isLoading}/>
            <CarOptionsCard label='babySeat' title='Baby Seat' icon={FaBaby} price={PRICES.babySeat} register={register} isLoading={isLoading}/>
            <CarOptionsCard label='childSeat' title='Child Seat' icon={FaChild} price={PRICES.childSeat} register={register} isLoading={isLoading}/>
            <CarOptionsCard label='snowChains' title='Snow Chains' icon={BsSnow} price={PRICES.snowChains} register={register} isLoading={isLoading}/>
            <CarOptionsCard label='skiSupport' title='Ski Support' icon={FaSkiing} price={PRICES.skiSupport} register={register} isLoading={isLoading}/>
            <CarOptionsCard label='bikeSupport' title='Bike Support' icon={PiPersonSimpleBikeBold} price={PRICES.bikeSupport} register={register} isLoading={isLoading}/>
        </div>
    )
}

export default CarOptions;