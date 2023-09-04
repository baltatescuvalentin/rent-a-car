'use client';

import useCarRegisterModal from "@/app/hooks/useCarRegisterModal";
import { useEffect, useReducer, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import Input from "../inputs/Input";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Image from "next/image";
import Button from "../Button";
import axios from "axios";
import { CAR_TYPE, CATEGORIES, CLOUDINARY_NAME, CLOUDINARY_PRESET, FUEL_TYPES } from "@/app/others/constants";
import { toast } from "react-hot-toast";
import Dropdown from "../Dropdown";
import { useRouter } from "next/navigation";
import { Car } from "@prisma/client";
import useCarEditModal from "@/app/hooks/useCarEditModal";

interface CarRegisterModalProps {
    open?: boolean,
}

const UpdateCarModal: React.FC<CarRegisterModalProps> = ({ open }) => {

    const router = useRouter();

    const [openModal, setOpenModal] = useState(open);

    const toggleEditModal = () => {
        setOpenModal(prev => !prev);
    }

    const carEditModal = useCarEditModal();

    console.log(carEditModal.car);

    const [showModal, setShowModal] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState<HTMLInputElement[]>([]);
    const [imagesDeleted, setImagesDeleted] = useState<HTMLInputElement[]>([]);
    const [uploadedImages, setUploadedImages] = useState<HTMLInputElement[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [imagesError, setImagesError] = useState(false);
    const emptyCar = carEditModal.car?.imgSrc
 
    const {
        register,
        formState: {
            errors,
        },
        getValues,
        handleSubmit,
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            maker: carEditModal.car?.maker,
            model: carEditModal.car?.model,
            category: carEditModal.car?.category,
            type: carEditModal.car?.type,
            horsePower: carEditModal.car?.horsePower,
            year: carEditModal.car?.year,
            color: carEditModal.car?.color,
            seatsCount: carEditModal.car?.seatsCount,
            doorsCount: carEditModal.car?.doorsCount,
            fuel: carEditModal.car?.fuel,
            availableCount: 0,
            price: carEditModal.car?.price,
        }
    })

    const [carImages, setCarImages] = useState<string[]>([]);

    useEffect(() => {
        setCarImages([...(carEditModal.car?.imgSrc || [])]);
    }, [carEditModal.car?.id]);

    console.log(carImages);

    useEffect(() => {
        setShowModal(carEditModal.isOpen);
    }, [carEditModal.isOpen])

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

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
            fileReaders.map((fileReader) => {
                if(fileReader.readyState === 1) {
                    fileReader.abort();
                }
            })
        }
    }, [imageFiles]);

    const deleteCarImages = (index: number) => {
        let images = [];
        for(let i = 0; i < carImages.length; i++) {
            if(i !== index) {
                images.push(carImages[i]);
            }
        }
        console.log(images);
        setCarImages(images);
    }

    const deleteImage = (index: number) => {
        let images = [];
        let files = [];
        for(let i = 0; i < uploadedImages.length; i++) {
            if(i !== index) {
                images.push(uploadedImages[i]);
                files.push(imageFiles[i]);
            }
        }
        console.log(images);
        setImagesDeleted(images);
        setImageFiles(files);
        return;
    }

    useEffect(() => {
        setUploadedImages(imagesDeleted);
    }, [imagesDeleted]);

    const onSubmit: SubmitHandler<FieldValues> = async () => {

        if(uploadedImages.length === 0 && carImages.length === 0) {
            setImagesError(true);
            return;
        }
        else {
            setImagesError(false);
        }

        setIsLoading(true);
        let secureUrlsFromRes: string[] = carImages;
        if(imageInputRef.current?.files) {
            console.log(imageInputRef.current.files);
            for(let i = 0; i < imageInputRef.current.files.length; i++) {
                const file = imageInputRef.current.files[i];
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", CLOUDINARY_PRESET)
                try {
                    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, data);
                    console.log(response)
                    secureUrlsFromRes.push(response.data.secure_url);
                }
                catch(error: any) {
                    console.error(error);
                }
            }
            setUploadedImages([]);
            console.log(secureUrlsFromRes);
        }

        let aCount = 0;
        if(carEditModal.car?.availableCount) {
            aCount = carEditModal.car.availableCount;
        }

        const customData = {
            maker: capitalize(getValues('maker')),
            model: capitalize(getValues('model')),
            category: getValues('category'),
            type: getValues('type'),
            horsePower: getValues('horsePower'),
            year: getValues('year'),
            color: capitalize(getValues('color')),
            seatsCount: getValues('seatsCount'),
            doorsCount: getValues('doorsCount'),
            fuel: getValues('fuel'),
            availableCount: aCount + parseInt(getValues('availableCount')),
            price: getValues('price'),
            imageSrc: secureUrlsFromRes,
        }
        console.log(customData);

        axios.put(`/api/car/${carEditModal.car?.id}`, customData)
            .then(() => {
                toast.success('Updated the car!');
                carEditModal.onClose();
                router.refresh();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    if(!carEditModal.isOpen) {
        return null;
    }

    return (
        <div className="inset-0 fixed flex items-center justify-center z-50 bg-neutral-500/70 focus:outline-none">
            <div className="overflow-y-auto w-full h-full relative sm:h-[96vh] md:w-4/6 my-6">
                <div className={`translate duration-300 h-full `}>
                    <div className="flex flex-col gap-3 px-6 pb-4 mx-auto outline-none rounded-lg border-[2px] md:border-blue-600 shadow-lg h-full sm:h-auto overflow-x-hidden overflow-y-auto bg-white">
                        <div className='flex flex-row items-center justify-center relative border-b-[1px] py-6 border-neutral-500'>
                            <p className='text-xl font-semibold'>
                                Edit car information
                            </p>
                            <button onClick={() => {
                                carEditModal.onClose();
                                setUploadedImages([]);
                            }} className='absolute hover:opacity-60 left-5'>
                                <FaTimes size={22} />
                            </button>
                        </div>
                        <p className="text-xl text-red-600">
                            Change only the fields you want
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <Input preVal={carEditModal.car?.maker} id="maker" label="Maker" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            <Input preVal={carEditModal.car?.model} id="model" label="Model" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            {/*<Input id="category" label="Category" isLoading={isLoading} register={register} errors={errors} type="text"/>*/}
                            <Dropdown preVal={carEditModal.car?.category} id="category" label="Category" setValue={setValue} disabled={isLoading} errors={errors} register={register} categories={CATEGORIES}/>
                            {/*<Input id="type" label="Type(automatic/manual)" isLoading={isLoading} register={register} errors={errors} type="text"/>*/}
                            <Dropdown preVal={carEditModal.car?.type} id="type" label="Type" setValue={setValue} disabled={isLoading} errors={errors} register={register} categories={CAR_TYPE}/>
                            <Input preVal={carEditModal.car?.horsePower} id="horsePower" label="Horse power" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input preVal={carEditModal.car?.year} id="year" label="Year" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input preVal={carEditModal.car?.color} id="color" label="Color" isLoading={isLoading} register={register} errors={errors} type="text"/>
                            {/*<Input id="fuel" label="Fuel" isLoading={isLoading} register={register} errors={errors} type="text"/>*/}
                            <Dropdown preVal={carEditModal.car?.fuel} id="fuel" label="Fuel" setValue={setValue} disabled={isLoading} errors={errors} register={register} categories={FUEL_TYPES}/>
                            <Input preVal={carEditModal.car?.seatsCount} id="seatsCount" label="Seats" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input preVal={carEditModal.car?.doorsCount} id="doorsCount" label="Doors" isLoading={isLoading} register={register} errors={errors} type="number"/>
                            <Input preVal={0} id="availableCount" label="How many more cars do you add?" isLoading={isLoading} register={register} errors={errors} type="number" update={true}/>
                            <Input preVal={carEditModal.car?.price} id="price" label="Price" isLoading={isLoading} register={register} errors={errors} type="number"/>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-4">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full lg:w-[40vw] h-[20vh] border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-200">
                                <AiOutlineCloudUpload size={32} />
                                <p className="text-lg text-neutral-700"><span className="font-semibold">Click to upload</span> the images of the cars</p>
                                <input type="file" accept="image/*" multiple className="hidden" id="dropzone-file" ref={imageInputRef} onChange={handleChange}/>
                            </label>
                            <div className="flex flex-col lg:flex-row flex-wrap basis-2/6 justify-center gap-3 mt-4">
                                {carImages.length > 0 && carImages.map((carImg, index) => (
                                    <div key={index} className="relative">
                                        <img className="rounded-lg w-[350px] h-[200px]" alt="curr img" src={carImg}/>
                                        <FaTimesCircle onClick={() => deleteCarImages(index)} size={24} 
                                            className="absolute z-50 -top-2 -right-2 fill-red-600 hover:cursor-pointer bg-white rounded-full" />
                                    </div>
                                ))}
                                {uploadedImages.length > 0 && uploadedImages.map((img, index) => (
                                    <div key={index} className="relative">
                                        <Image className="rounded-lg w-[350px] h-[200px]" alt="curr img" src={img} width={0} height={0}/>
                                        <FaTimesCircle onClick={() => deleteImage(index)} size={24} 
                                            className="absolute z-50 -top-2 -right-2 fill-red-600 hover:cursor-pointer bg-white rounded-full" />
                                    </div>
                                    
                                ))}
                                { imagesError && (
                                    <p className="text-lg text-center font-semibold text-red-500">
                                        Add more images!
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button label="Submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}/>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default UpdateCarModal;