'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import Button from "../Button";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Heading from "../Heading";
import { signIn } from "next-auth/react";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassowrd: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        const customObject = {
            email: getValues('email'),
            name: getValues('name'),
            password: getValues('password'),
            isAdmin: false,
        }
        axios.post('api/register', customObject)
            .then(() => {
                toast.success('Account created!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error('Error creating account!');

            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    let bodyContent = (
        <div className="flex flex-col gap-4 py-2">
            <Heading title="Welcome to Rent-a-car" subtitle="Create your own account." />
            <div className="relative w-full">
                <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors.email ? 'border-rose-500' : 'border-neutral-400'} ${errors.email ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type="email" id="email" disabled={isLoading} placeholder=" " 
                {...register('email', { required: 'Email is required', pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                }})} />
                <label id="email" className={`absolute duration-150 transform z-10 left-4 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.email ? 'text-rose-500' : 'text-zinc-400'}`} >
                    Email
                </label>
                {errors.email && errors.email?.type === 'required' && <p className=" text-red-500">{errors.email?.message?.toString()}</p>}
                {errors.email && errors.email?.type === 'pattern' && <p className=" text-red-500">{errors.email?.message?.toString()}</p>}
            </div>
            <div className="relative w-full">
                <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors.name ? 'border-rose-500' : 'border-neutral-400'} ${errors.name ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type="text" id="name" disabled={isLoading} placeholder=" " 
                {...register('name', { required: 'Name is required'})} />
                <label id="name" className={`absolute duration-150 transform z-10 left-4 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.name ? 'text-rose-500' : 'text-zinc-400'}`} >
                    Name
                </label>
                {errors.name && errors.name?.type === 'required' && <p className=" text-red-500">{errors.name?.message?.toString()}</p>}
            </div>
            
            <div className="relative w-full">
                <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors.password ? 'border-rose-500' : 'border-neutral-400'} ${errors.password ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type="password" id="password" disabled={isLoading} placeholder=" " 
                {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password should be atleast 8 characters'}})} />
                <label id="password" className={`absolute duration-150 transform z-10 left-4 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.password ? 'text-rose-500' : 'text-zinc-400'}`} >
                    Password
                </label>
                {errors.password && errors.password?.type === 'required' && <p className="text-red-500">{errors.password?.message?.toString()}</p>}
                {errors.password && errors.password?.type === 'minLength' && <p className="text-red-500">{errors.password?.message?.toString()}</p>}
            </div>
            <div className="relative w-full">
                <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors.confirmPassword ? 'border-rose-500' : 'border-neutral-400'} ${errors.confirmPassword ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type="password" id="confirmPassword" disabled={isLoading} placeholder=" " 
                {...register('confirmPassword', { required: 'Confirm password is required', validate: (val: string) => {
                    const password = getValues('password');
                    return password == val || 'Password do not match, try again!'
                }})} />
                <label id="confirmPassword" className={`absolute duration-150 transform left-4 z-10 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.confirmPassword ? 'text-rose-500' : 'text-zinc-400'}`} >
                    Confirm Password
                </label>
                {errors.confirmPassword && errors.confirmPassword?.type === 'required' && <p className="text-red-500">{errors.confirmPassword?.message?.toString()}</p>}
                {errors.confirmPassword && errors.confirmPassword?.type === 'validate' && <p className="text-red-500">{errors.confirmPassword?.message?.toString()}</p>}
            </div>
        </div>
    )

    let footerContent = (
        <div className="flex flex-col items-center gap-3 mb-2">
            <Button label="Continue with Google" icon={FcGoogle} outline disabled={isLoading} onClick={() => signIn('google')}/>
            <hr />
            <p className="text-lg text-neutral-500">Already have an account?<span className="text-lg text-neutral-700 hover:cursor-pointer" onClick={onToggle}> Log in</span></p>
        </div>
    )

    return (
        <Modal title="Register" isOpen={registerModal.isOpen} onClose={registerModal.onClose} actionLabel="Continue" disabled={isLoading} body={bodyContent} onSubmit={handleSubmit(onSubmit)} footer={footerContent}/>
    )
}

export default RegisterModal;