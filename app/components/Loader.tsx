'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="h-[51vh] flex flex-col items-center justify-center">
            <PuffLoader size={100} color="blue"/>
        </div>
    )
}

export default Loader;