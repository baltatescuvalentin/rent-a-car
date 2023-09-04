import { Car } from "@prisma/client";
import { create } from "zustand";

interface CarEditModalStore {
    isOpen: boolean,
    car: Car | null,
    onOpen: (data: Car) => void,
    onClose: () => void,
}

const useCarEditModal = create<CarEditModalStore>((set) => ({
    isOpen: false,
    car: null,
    onOpen: (data: Car) => set({ isOpen: true, car: data }),
    onClose: () => set({ isOpen: false, car: null })
}))

export default useCarEditModal;