import { create } from "zustand";

interface CarRegisterModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useCarRegisterModal = create<CarRegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useCarRegisterModal;