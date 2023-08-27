'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";

interface EmptyStateProps {
    title?: string,
    subtitle?: string,
}

const EmptyState: React.FC<EmptyStateProps> = ({ title="No exact matches", subtitle="Try another page or filters" }) => {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Heading title={title} subtitle={subtitle} />
        </div>
    )
}

export default EmptyState;