'use client';

import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Input from "../inputs/Input";
import { useState } from "react";


interface ContactInfoProps {
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    isLoading: boolean,
    setValue: UseFormSetValue<FieldValues>,
}

const ContactInfo: React.FC<ContactInfoProps> = ({ register, errors, isLoading, setValue }) => {

    const [text, setText] = useState('');

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const data = e.target.value;
        setText(data);
        setValue('remarks', data);
    }

    return (
        <div className="flex flex-col justify-start gap-3 px-4 mt-5">
            <div className="rounded-md w-full md:w-[400px] text-center text-[26px] sm:text-[32px] mb-3 bg-blue-500 text-white font-bold px-3 py-1">
                Additional contact info
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
                <Input label="Full Name" register={register} errors={errors} isLoading={isLoading} type="text" id="fullName"/>
                <Input label="Email" register={register} errors={errors} isLoading={isLoading} type="email" id="email"/>
                <Input label="Phone number" register={register} errors={errors} isLoading={isLoading} type="tel" id="phoneNumber"/>
            </div>
            <textarea value={text} onChange={handleTextarea} id="remarks" placeholder="Some other info..." className="w-full min-h-[150px] border-[1px] border-neutral-500 rounded-lg p-3 text-lg" />
        </div>
    )
}

export default ContactInfo;