'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast/headless";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import { FormRegister } from "@/app/types";
import Input from "../inputs/Input";

const LoginModal = () => {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            if(callback?.ok) {
                setIsLoading(false);
                reset();
                loginModal.onClose();
                router.refresh();
                setError(null);
                //toast.success('Logged in!');
            }
            else if(callback?.error) {
                setIsLoading(false);
                //toast.error(callback.error);
                setError(callback.error);
            }
        })
        .catch((error: any) => {
            setIsLoading(false);
            console.error(error);
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        })

    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        reset();
        registerModal.onOpen();
    }, [loginModal, registerModal, reset]);

    let emailForm: FormRegister = {
        requiredMsg: 'Email is required',
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
        }
    };

    let passwordForm: FormRegister = {
        requiredMsg: 'Password is required',
    };

    let bodyContent = (
        <div className="flex flex-col gap-4 py-2">
            <Heading title="Welcome back!" subtitle="Login to your account."/>
            {error && (
                <p className="text-xl font-bold text-red-500">
                    {error}
                </p>
            )}
            <Input preVal={getValues('email')} label="Email" id="email" type="email" register={register} errors={errors} isLoading={isLoading} requiredObject={emailForm}/>
            <Input preVal={getValues('password')} label="Password" id="password" type="password" register={register} errors={errors} isLoading={isLoading} requiredObject={passwordForm} />
            
            {/*<div className="relative w-full">
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
                <input className={`peer w-full p-4 pt-6 font-medium border-2 rounded-md outline-none bg-white transition disabled:opacity-70 disabled:cursor-not-allowed ${errors.password ? 'border-rose-500' : 'border-neutral-400'} ${errors.password ? 'focus:border-rose-500' : 'focus:border-neutral-600'}`}
                type="password" id="password" disabled={isLoading} placeholder=" " 
                {...register('password', { required: 'Password is required'})} />
                <label id="password" className={`absolute duration-150 transform z-10 left-4 top-5 origin-[0] -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors.password ? 'text-rose-500' : 'text-zinc-400'}`} >
                    Password
                </label>
                {errors.password && errors.password?.type === 'required' && <p className="text-red-500">{errors.password?.message?.toString()}</p>}
            </div>*/}
        </div>
    )

    let footerContent = (
        <div className="flex flex-col items-center gap-3 mb-2">
            <Button label="Continue with Google" icon={FcGoogle} outline disabled={isLoading} onClick={() => signIn('google')}/>
            <hr />
            <p className="text-lg text-neutral-500">Don`t have an account?<span className="text-lg text-neutral-700 hover:cursor-pointer" onClick={onToggle}> Sign up</span></p>
        </div>
    )

    return (
        <Modal title="Login" 
            isOpen={loginModal.isOpen} 
            onClose={loginModal.onClose} 
            actionLabel="Continue" 
            disabled={isLoading} 
            body={bodyContent} 
            footer={footerContent} 
            onSubmit={handleSubmit(onSubmit)}
            modalType="login"
            reset={reset}/>
    )
}

export default LoginModal;