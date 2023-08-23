import { create } from "zustand";

interface CarsFilterModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useCarsFilterModal = create<CarsFilterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useCarsFilterModal;