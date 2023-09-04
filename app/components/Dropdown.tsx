'use client';

import { useEffect, useRef, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface DropdownProps {
    categories: string[],
    id: string,
    disabled: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    label: string,
    setValue: UseFormSetValue<FieldValues>,
    preVal?: string,
}

const Dropdown: React.FC<DropdownProps> = ({ categories, id, disabled, register, errors, label, setValue, preVal }) => {

    const selectRef = useRef<HTMLSelectElement>(null);

    if(preVal) {
        setValue(id, preVal);
    }

    useEffect(() => {
        const updateOptionWidth = () => {
            if(selectRef.current) {
                const selectWidth = selectRef.current.offsetWidth;
                const optionElements = selectRef.current.querySelectorAll('option');

                optionElements.forEach((option) => {
                    option.style.width = `${selectWidth}px`;
                })
            }
        };

        updateOptionWidth();
        window.addEventListener('resize', updateOptionWidth);

        return () => {
            window.removeEventListener('resize', updateOptionWidth);
        }
    }, [])

    const handleSelect = (e: any) => {

        setValue(id, e.target.value);
    }

    return (
        <div className="flex flex-col">
            <select {...register(id, { required: `${label} is required`})} id={id} defaultValue={`${preVal || label}`} className={`rounded-md border-[2px] pl-3 border-neutral-400 w-auto h-[68px] [&>option]:w-[50px] disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-500' : 'border-neutral-400'} ${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`} ref={selectRef} disabled={disabled} onChange={handleSelect}>
                <option value={label} disabled>
                    {label}
                </option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            {errors[id] && errors[id]?.type === 'required' && <p className=" text-red-500">{errors[id]?.message?.toString()}</p>}
        </div>
    )
}

export default Dropdown;