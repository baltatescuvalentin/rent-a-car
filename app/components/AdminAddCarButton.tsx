'use client';

import useCarRegisterModal from "../hooks/useCarRegisterModal";

const AdminAddCarButton = () => {

    const carRegisterModal = useCarRegisterModal();

    return (
        <button onClick={carRegisterModal.onOpen} className="rounded-lg bg-blue-600 text-white font-semibold text-xl w-full px-3 py-2 mb-5">
            Add new car!
        </button>
    )
}

export default AdminAddCarButton;