'use client';

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string,
    register: UseFormRegister<FieldValues>,
    isLoading: boolean,
    errors: FieldErrors,
    id: string,
    type: string,
    preVal?: string | number,
    update?: boolean,
}

const Input: React.FC<InputProps> = ({ label, register, isLoading, errors, id, type, preVal, update=false }) => {

    const emptyPreVal = type === 'text' ? "" : 0
    const [inputVal, setInputVal] = useState<string | number>(preVal || emptyPreVal);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    }

    const minVal = update ? 0 : 1

    let formObject = {};
    if(type === "number") {
        formObject = {
            min: minVal,
        }
    }
    else {
        formObject = {
            required: `${label} is required`
        }
    }

    return (
        <div className="relative w-full">
            <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-500' : 'border-neutral-400'} ${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type={type} id={id} disabled={isLoading} value={inputVal}
                {...register(id , formObject)} 
                onChange={onInputChange}
            />
            <label id={id} className={`absolute duration-150 transform z-10 left-4 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}>
                {label}
            </label>
            {errors[id] && errors[id]?.type === 'required' && <p className=" text-red-500">{errors[id]?.message?.toString()}</p>}
            {errors[id] && errors[id]?.type === 'min' && <p className=" text-red-500">{label + ' is required'}</p>}
        </div>
    )
}

export default Input;