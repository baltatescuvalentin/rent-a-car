'use client';

import { Car } from "@prisma/client";


interface ExtraOptionsProps {
    data?: Car | null,
}

const ExtraOptions: React.FC<ExtraOptionsProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
                
        </div>
    )
}

export default ExtraOptions;