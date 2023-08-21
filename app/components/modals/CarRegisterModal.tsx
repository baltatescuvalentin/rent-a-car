'use client';

import useCarRegisterModal from "@/app/hooks/useCarRegisterModal";
import { useEffect, useReducer, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import Input from "../inputs/Input";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from "next/image";
import Button from "../Button";

const CarRegisterModal = () => {

    const carRegisterModal = useCarRegisterModal();
    const [showModal, setShowModal] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState<HTMLInputElement[]>([]);
    const [imagesDeleted, setImagesDeleted] = useState<HTMLInputElement[]>([]);
    const [uploadedImages, setUploadedImages] = useState<HTMLInputElement[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const {
        register,
        formState: {
            errors,
        },
        getValues,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            maker: '',
            model: '',
            category: '',
            type: '',
            horsePower: 0,
            year: 0,
            color: '',
            seatsCount: 0,
            doorsCount: 0,
            fuel: '',
            availableCount: 0,
            price: 0,
        }
    })

    useEffect(() => {
        setShowModal(carRegisterModal.isOpen);
    }, [carRegisterModal.isOpen])

    const handleChange = (e: any) => {
        const { files } = e.target;
        const validImages: HTMLInputElement[] = [];
        for(let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(typeof file);
            validImages.push(file);
        }
        setImageFiles(validImages);
        return;
    }

    useEffect(() => {
        const images: any[] | ((prevState: HTMLInputElement[]) => HTMLInputElement[]) = [];
        let fileReaders: FileReader[] = [];
        let isCancel = false;
        if(imageFiles.length) {
            imageFiles.map((file: any) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e: any) => {
                    const { result } = e.target;
                    if(result) {
                        images.push(result);
                    }

                    if(images.length === imageFiles.length && !isCancel) {
                        setUploadedImages(images);
                        console.log(uploadedImages);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        }
        return () => {
            isCancel = true;
            fileReaders.forEach((fileReader) => {
                if(fileReader.readyState === 1) {
                    fileReader.abort();
                }
            })
        }
    }, [imageFiles]);

    const deleteImage = (index: number) => {
        let images = [];
        for(let i = 0; i < uploadedImages.length; i++) {
            if(i !== index)
                images.push(uploadedImages[i]);
        }
        console.log(images);
        setImagesDeleted(images);
        return;
    }

    useEffect(() => {
        setUploadedImages(imagesDeleted);
        console.log(uploadedImages);
    }, [imagesDeleted]);

    const onSubmit = () => {
        console.log(uploadedImages);
    }

    return (
        <div className="inset-0 fixed flex items-center justify-center z-50 bg-neutral-500/70 focus:outline-none">
            <div className="overflow-y-auto w-full h-full relative sm:h-[96vh] md:w-4/6 my-6">
                <div className={`translate duration-300 h-full `}>
                    <div className="flex flex-col gap-3 px-6 pb-4 mx-auto outline-none rounded-lg border-[2px] md:border-blue-600 shadow-lg h-full sm:h-auto overflow-x-hidden overflow-y-auto bg-white">
                        <div className='flex flex-row items-center justify-center relative border-b-[1px] py-6 border-neutral-500'>
                            <p className='text-xl font-semibold'>
                                Add a new car
                            </p>
                            <button onClick={carRegisterModal.onClose} className='absolute hover:opacity-60 left-5'>
                                <FaTimes size={22} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <Input id="maker" label="Maker" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="model" label="Model" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="category" label="Category" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="type" label="Type(automatic/manual)" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="horsePower" label="Horse power" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input id="year" label="Year" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input id="color" label="Color" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="fuel" label="Fuel" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input id="seatsCount" label="Seats" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input id="doorsCount" label="Doors" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input id="availableCount" label="How many are available" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input id="price" label="Price" isLoading={isLoading} register={register} errors={errors} type="number"/>
                        </div>
                        <div className="flex flex-col items-center justify-center mx-auto my-4">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-[40vw] h-[20vh] border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-200">
                                <AiOutlineCloudUpload size={32} />
                                <p className="text-lg text-neutral-700"><span className="font-semibold">Click to upload</span> the images of the cars</p>
                                <input type="file" accept="image/*" multiple className="hidden" id="dropzone-file" ref={imageInputRef} onChange={handleChange}/>
                            </label>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 my-4">
                                {uploadedImages.length > 0 && uploadedImages.map((img, index) => (
                                    <div key={index} className="relative">
                                        <Image className="rounded-lg w-[200px] h-[200px]" alt="curr img" src={img} width={0} height={0}/>
                                        <FaTimesCircle onClick={() => deleteImage(index)} size={24} 
                                            className="absolute z-50 -top-2 -right-2 fill-red-600 hover:cursor-pointer bg-white rounded-full" />
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                        <Button label="Submit" onClick={onSubmit}/>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CarRegisterModal;