'use client';

import { Car } from "@prisma/client";


interface RentClientProps {
    car: Car,
}

const RentClient: React.FC<RentClientProps> = ({ car }) => {

    console.log(car);

    return (
        <div>

        </div>
    )
}

export default RentClient;