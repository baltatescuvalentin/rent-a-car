'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";

interface EmptyStateProps {
    title?: string,
    subtitle?: string,
    path?: string,
    label?: string,
}

const EmptyState: React.FC<EmptyStateProps> = ({ title="No exact matches", subtitle="Try another page or filters", path='/', label='Models' }) => {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center gap-2 min-h-[51vh]">
            <Heading title={title} subtitle={subtitle} center={true}/>
            <button onClick={() => router.push(path)} className="w-[200px] rounded-lg bg-blue-500 text-white text-[24px] py-2">
                {label}
            </button>
        </div>
    )
}

export default EmptyState;