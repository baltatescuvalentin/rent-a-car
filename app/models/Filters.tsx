'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io';
import qs from 'query-string';
import useCarRegisterModal from "../hooks/useCarRegisterModal";
import { User } from "@prisma/client";

interface FiltersProps {
    types?: string[],
    models?: string[],
    makers?: string[],
    fuels?: string[],
    categories?: string[],
    currentUser?: User | null,
}

const Filters: React.FC<FiltersProps> = ({ types, models, makers, fuels, categories, currentUser }) => {

    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    useEffect(() => {
        if(typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth)
        }
    }, [])

    const [openFilters, setOpenFilters] = useState(false);
    const carRegisterModal = useCarRegisterModal();

    const router = useRouter();
    const params = useSearchParams();

    const typesObj: any = {};
    const categoriesObj: any = {};
    const makersObj: any = {};
    const fuelsObj: any = {};

    types?.map((type) => typesObj[type] = false);

    categories?.map((category) => categoriesObj[category] = false);

    makers?.map((maker) => makersObj[maker] = false);

    fuels?.map((fuel) => fuelsObj[fuel] = false);

    const [typesState, setTypesState] = useState(typesObj);
    const [categoriesState, setCategoriesState] = useState(categoriesObj);
    const [makersState, setMakersState] = useState(makersObj);
    const [fuelsState, setFuelsState] = useState(fuelsObj);

    const handleTypes = (name: string, value: boolean) => {
        setTypesState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCategories = (name: string, value: boolean) => {
        setCategoriesState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleMakers = (name: string, value: boolean) => {
        setMakersState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleFuels = (name: string, value: boolean) => {
        setFuelsState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const updateFilters = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {

        const { id, checked } = event.target;

        if(type === 'type') {
            handleTypes(id, checked);
        }
        else if(type === 'category') {
            handleCategories(id, checked);
        }
        else if(type === 'maker') {
            handleMakers(id, checked);
        }
        else {
            handleFuels(id, checked);
        }
    }

    const resetFilters = () => {
        setTypesState(typesObj);
        setCategoriesState(categoriesObj);
        setFuelsState(fuelsObj);
        setMakersState(makersObj);
    }

    const parseObject = (obj: any) => {
        let arr: string[] = [];
        for(const [key, value] of Object.entries(obj)) {
            if(value === true) {
                arr.push(key);
            }
        }

        return arr;
    }

    const getFiltersData = () => {
        const typesFromObj = parseObject(typesState);
        const makersFromObj = parseObject(makersState);
        const categoriesFromObj = parseObject(categoriesState);
        const fuelsFromObj = parseObject(fuelsState);
    
        return [
            typesFromObj,
            makersFromObj,
            categoriesFromObj,
            fuelsFromObj,
        ]
    }

    const onSubmit = () => {

        const [
            types,
            makers,
            categories,
            fuels,
        ] = getFiltersData();

        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            makers,
            categories,
            fuels,
            types,
        }

        const url = qs.stringifyUrl({
            url: '/models',
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);

    }

    useEffect(() => {

        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(window.innerWidth > 1024) {
            setOpenFilters(true);
        }
        else {
            setOpenFilters(false);
        }
    }, [windowWidth]);

    const handleOpenFilters = () => {
        setOpenFilters(value => !value);
    }

    return (
        <div className={`w-full md:w-[300px]`}>
            <div>
                {currentUser?.isAdmin && (
                    <button onClick={carRegisterModal.onOpen} className="rounded-lg bg-blue-600 text-white font-semibold text-xl w-full px-3 py-2 mb-5">
                        Add new car!
                    </button>
                )}
                <div onClick={handleOpenFilters} className={`md:hidden flex flex-row justify-between items-center px-4 border-[1px] border-neutral-600 rounded-md ${!openFilters && 'shadow-sm'}`}>
                    <p className="text-2xl font-semibold">
                        {openFilters ? 'Hide' : 'Show'} Filters
                    </p>
                    <IoIosArrowUp className={`transform transition-transform duration-150 ${!openFilters ? 'rotate-180' : 'rotate-0'}`} size={30}/>
                </div>
                {openFilters &&
                <div className={`flex flex-col gap-3 items-start bg-neutral-100 p-3 rounded-md transition duration-150 ${openFilters ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    <fieldset id="typefield" className="">
                        <legend className="text-2xl text-neutral-800 font-semibold mb-1">
                            Transmission
                        </legend>
                        <div className="flex flex-row md:flex-col flex-wrap gap-2">
                            {types?.map((type, index) => (
                                <div key={index} className="flex flex-row items-center gap-2 md:gap-3 ml-2">
                                    <input className="bg-white relative peer scale-[150%] w-4 h-4 checked:border-blue-700 appearance-none hover:cursor-pointer border-[1px] border-neutral-700 focus:ring-2 rounded-sm"  
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters(e, 'type')} type="checkbox" name="transmission" id={type} checked={typesState[type]} value={type}/>
                                    <FaCheck size={20} className="absolute hidden peer-checked:block -translate-x-[2px] fill-blue-700 pointer-events-none"/>
                                    <label className="text-xl" htmlFor={type}>
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset id="category" className="">
                        <legend className="text-2xl text-neutral-800 font-semibold mb-1">
                            Category
                        </legend>
                        <div className="flex flex-row md:flex-col flex-wrap gap-2">
                            {categories?.map((category, index) => (
                                <div key={index} className="flex flex-row items-center gap-2 md:gap-3 ml-2">
                                    <input className="bg-white relative peer scale-[150%] w-4 h-4 checked:border-blue-700 appearance-none hover:cursor-pointer border-[1px] border-neutral-700 focus:ring-2 rounded-sm"  
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters(e, 'category')} type="checkbox" name="transmission" checked={categoriesState[category]} id={category} value={category}/>
                                    <FaCheck size={20} className="absolute hidden peer-checked:block -translate-x-[2px] fill-blue-700 pointer-events-none"/>
                                    <label className="text-xl" htmlFor={category}>
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset id="maker" className="">
                        <legend className="text-2xl text-neutral-800 font-semibold mb-1">
                            Makers
                        </legend>
                        <div className="flex flex-row md:flex-col flex-wrap gap-2">
                            {makers?.map((maker, index) => (
                                <div key={index} className="flex flex-row items-center gap-2 md:gap-3 ml-2">
                                    <input className="bg-white relative peer scale-[150%] w-4 h-4 checked:border-blue-700 appearance-none hover:cursor-pointer border-[1px] border-neutral-700 focus:ring-2 rounded-sm"  
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters(e, 'maker')} type="checkbox" name="transmission" checked={makersState[maker]} id={maker} value={maker}/>
                                    <FaCheck size={20} className="absolute hidden peer-checked:block -translate-x-[2px] fill-blue-700 pointer-events-none"/>
                                    <label className="text-xl" htmlFor={maker}>
                                        {maker}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <fieldset id="fuel" className="">
                        <legend className="text-2xl text-neutral-800 font-semibold mb-1">
                            Fuel
                        </legend>
                        <div className="flex flex-row md:flex-col flex-wrap gap-2">
                            {fuels?.map((fuel, index) => (
                                <div key={index} className="flex flex-row items-center gap-2 md:gap-3 ml-2">
                                    <input className="bg-white relative peer scale-[150%] w-4 h-4 checked:border-blue-700 appearance-none hover:cursor-pointer border-[1px] border-neutral-700 focus:ring-2 rounded-sm"  
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters(e, 'fuel')} type="checkbox" name="transmission" checked={fuelsState[fuel]} id={fuel} value={fuel}/>
                                    <FaCheck size={20} className="absolute hidden peer-checked:block -translate-x-[2px] fill-blue-700 pointer-events-none"/>
                                    <label className="text-xl" htmlFor={fuel}>
                                        {fuel}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <button onClick={onSubmit} className="w-full bg-blue-700 rounded-md text-lg text-white py-1">
                        Apply filters
                    </button>
                    <button onClick={resetFilters} className="w-full bg-blue-700/50 rounded-md text-lg text-white py-1">
                        Reset filters
                    </button>
                </div>
                }
            </div>
        </div>
    )
}

export default Filters;