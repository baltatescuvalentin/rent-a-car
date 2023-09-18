'use client';

import { toast } from "react-hot-toast";
import getCars, { CarsParams } from "../actions/getCars";
import CarCard from "../components/CarCard";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import { Car, User } from "@prisma/client";


interface ModelsProps {
    currentUser: User | null,
    carsDB: Car[],
}

const Models: React.FC<ModelsProps> = ({ currentUser, carsDB }) => {

    if(!carsDB) {
        return <EmptyState />
    }

    const cars = Array.from(carsDB);

    return (
        <div className="w-full">
            <div className="flex flex-row items-center gap-3 justify-between mb-2">
                <div className="w-full h-[5px] bg-green-400">
                </div>
                <div className="text-2xl font-bold text-green-400">
                    Models
                </div>
                <div className="w-full h-[5px] bg-green-400">
                </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full flex-wrap justify-evenly gap-5">
                {carsDB.map((car) => <CarCard key={car.id} data={car} currentUser={currentUser}/>)}
            </div>
        </div>
    )
}

export default Models;