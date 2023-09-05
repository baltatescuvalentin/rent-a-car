'use client';

import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Range } from 'react-date-range';
import { eachDayOfInterval, setDate, differenceInDays } from "date-fns";
import { SafeReservation } from "@/app/types";
import Carousel from "../Carousel";
import Calendar from "./Calendar";
import CarOptions from "./CarOptions";
import ContactInfo from "./ContactInfo";
import { User } from "@prisma/client";
import { PRICES } from "@/app/others/constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

interface RentProps {
    carId: string,
    availableCount: number,
    reservations?: SafeReservation[],
    images: string[],
    currentUser: User | null,
    price: number,
    disabledDates?: Date[],
}

const Rent: React.FC<RentProps> = ({ images, carId, availableCount, reservations=[], price, currentUser, disabledDates }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [calculatedValue, setCalculatedValue] = useState(0);
    const loginModal = useLoginModal();
    const router = useRouter();

    const optionsForm = useForm<FieldValues>({
        defaultValues: {
            gps: false,
            babySeat: false,
            childSeat: false,
            wifi: false,
            snowChains: false,
            skiSupport: false,
            bikeSupport: false,
        }
    });

    const infoForm = useForm<FieldValues>({
        defaultValues: {
            email: '',
            phoneNumber: '',
            remarks: '',
            fullName: '',
        }
    })

    const watchedValues = optionsForm.watch(['gps', 'babySeat', 'childSeat', 'wifi', 'snowChains', 'skiSupport', 'bikeSupport']);

    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    /*const disabledDates = () => {
        let dates: Date[] = [];
        if(availableCount === 0) {
            reservations.forEach((reservation) => {
                const range = eachDayOfInterval({
                    start: new Date(reservation.startDate),
                    end: new Date(reservation.endDate),
                })
                console.log(range);

                dates = [...dates, ...range];
            })
        }

        return dates;
    }
    const disabledDatesArray = disabledDates();
    console.log('disalbed dates');
    console.log(disabledDatesArray);*/

    console.log('disalbed dates');
    console.log(disabledDates);

    console.log(carId);
    console.log(reservations);
    console.log(availableCount);

    const handleRange = (ranges: any) => {
        setDateRange(ranges.selection);
        console.log(dateRange);
    }

    useEffect(() => {

        let currPrice = 0;
        let daysDiff = 0;

        if(dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            daysDiff = differenceInDays(end, start) + 1;
            currPrice = daysDiff * price;
        }

        const values = optionsForm.getValues();
        Object.keys(values).map((fieldName) => {
            if(values[fieldName]) {
                currPrice = currPrice + (daysDiff * PRICES[fieldName as keyof typeof PRICES])
            }
        })

        setCalculatedValue(currPrice);
        
    }, [watchedValues, dateRange, price, optionsForm]);

    const totalPrice = useMemo(() => calculatedValue, [calculatedValue])

    const onSubmit: SubmitHandler<FieldValues> = async () => {

        try {
            if(!currentUser) {
                loginModal.onOpen();
                return;
            }

            setIsLoading(true);

            let response1;
            if(availableCount > 0) {
                const aCount: number = availableCount - 1;
                response1 = await  axios.post(`/api/car/${carId}`, {
                    availableCount: aCount,
                });
            }

            let response2 = await axios.post('/api/reservations', {
                carId: carId,
                totalPrice: totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                fullName: infoForm.getValues('fullName'),
                email: infoForm.getValues('email'),
                phoneNumber: infoForm.getValues('phoneNumber'),
                remarks: infoForm.getValues('remarks'),
                gps: optionsForm.getValues('gps'),
                wifi: optionsForm.getValues('wifi'),
                babySeat: optionsForm.getValues('babySeat'),
                childSeat: optionsForm.getValues('childSeat'),
                skiSupport: optionsForm.getValues('skiSupport'),
                bikeSupport: optionsForm.getValues('bikeSupport'),
                snowChains: optionsForm.getValues('snowChains'),
            });

            setDateRange(initialDateRange);
            router.push('/reservations')
            toast.success('Reservation made!');
        }
        catch(error: any) {
            toast.error(error);
        }
        /*
        if(availableCount > 0) {
            const aCount: number = availableCount - 1;
            axios.post(`/api/car/${carId}`, {
                availableCount: aCount,
            })
            .then(() => {

            })
            .catch((error: any) => {
                toast.error(error);
            })
        }

        axios.post('/api/reservations', {
            carId: carId,
            totalPrice: totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            fullName: infoForm.getValues('fullName'),
            email: infoForm.getValues('email'),
            phoneNumber: infoForm.getValues('phoneNumber'),
            remarks: infoForm.getValues('remarks'),
            gps: optionsForm.getValues('gps'),
            wifi: optionsForm.getValues('wifi'),
            babySeat: optionsForm.getValues('babySeat'),
            childSeat: optionsForm.getValues('childSeat'),
            skiSupport: optionsForm.getValues('skiSupport'),
            bikeSupport: optionsForm.getValues('bikeSupport'),
            snowChains: optionsForm.getValues('snowChains'),
        })
            .then(() => {
                toast.success('Reservation created!');
                setDateRange(initialDateRange);
                // route catre my trips
                router.push('/reservations');
            })
            .catch((error: any) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        axios.post('/api/caroptions', {
            gps: optionsForm.getValues('gps'),
            wifi: optionsForm.getValues('wifi'),
            babySeat: optionsForm.getValues('babySeat'),
            childSeat: optionsForm.getValues('childSeat'),
            skiSupport: optionsForm.getValues('skiSupport'),
            bikeSupport: optionsForm.getValues('bikeSupport'),
            snowChains: optionsForm.getValues('snowChains'),
            carId: carId,
            reservationId: reservationId,
        })
            .then(() => {
                toast.success('Car Options added!');
            })
            .catch((error: any) => {
                toast.error(error);
            })*/
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row items-center lg:justify-evenly gap-5 mb-3">
                <Carousel carId={carId} images={images} />
                <Calendar disabledDates={disabledDates} value={dateRange} onChange={handleRange} />
            </div>
            <CarOptions isLoading={isLoading} register={optionsForm.register}/>
            <ContactInfo setValue={infoForm.setValue} isLoading={isLoading} register={infoForm.register} errors={infoForm.formState.errors}/>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between px-5 gap-3">
                <div className="text-[32px] font-bold ">
                    Total: {totalPrice} $
                </div>
                <button onClick={infoForm.handleSubmit(onSubmit)} className={`w-full md:w-[250px] rounded-lg bg-blue-600 text-white font-semibold text-[32px] ${isLoading && 'disabled cursor-not-allowed bg-neutral-500'}`}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Rent;