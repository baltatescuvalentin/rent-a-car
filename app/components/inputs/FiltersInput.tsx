'use client';

import { IconType } from "react-icons";

interface FiltersInputProps {
    values?: string[] | undefined,
    icon: IconType,
    update: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void,
    valueStates: any,
    label: string,
    filterValue: string,
}

const FiltersInput: React.FC<FiltersInputProps> = ({ values, icon: Icon, update, valueStates, label, filterValue }) => {

    return (
        <div id="typefield" className="">
            <div className="text-2xl text-neutral-800 font-semibold mb-1">
                {label}
            </div>
            <div className="flex flex-row md:flex-col flex-wrap gap-2">
                {values?.map((type, index) => (
                    <div key={index} className="flex flex-row items-center gap-2 md:gap-3 ml-2">
                        <input className="bg-white relative peer scale-[150%] w-4 h-4 checked:border-blue-700 appearance-none hover:cursor-pointer border-[1px] border-neutral-700 focus:ring-2 rounded-sm"  
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(e, filterValue)} type="checkbox" name={`${label.toLocaleLowerCase()}`} id={type} checked={valueStates[type]} />
                        <Icon size={20} className="absolute hidden peer-checked:block -translate-x-[2px] fill-blue-700 pointer-events-none"/>
                        <label className="text-xl" htmlFor={type}>
                            {type}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FiltersInput;