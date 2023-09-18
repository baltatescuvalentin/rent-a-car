'use client'

import { useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from '../Button';
import { FieldValues, UseFormReset } from 'react-hook-form';

interface ModalProps {
    isOpen?: boolean,
    onClose: () => void,
    actionLabel: string,
    onSubmit: () => void,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    disabled?: boolean,
    title?: string,
    modalType?: string,
    reset: () => void,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, actionLabel, onSubmit, body, footer, disabled, title, modalType, reset }) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const closeModal = useCallback(() => {
        if(disabled) {
            return;
        }

        setShowModal(false);
        reset();
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose, reset])

    if(!isOpen) {
        return null;
    }

    return (
        <>
            <div className={`fixed flex items-center justify-center bg-neutral-500/70  inset-0 z-50 focus:outline-none`}>
                <div className={`relative duration-300  ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'} ${showModal ? 'opacity-100' : 'opacity-0'} overflow-y-auto w-full md:w-4/6 lg:3/6 xl:w-2/5 my-6 h-full ${modalType === 'login' ? 'sm:h-auto' : 'sm:h-[90vh]'} `}>
                    <div className={`rounded-lg border-[2px] md:border-blue-600 shadow-lg h-full sm:h-auto w-full bg-white flex flex-col gap-3 py-2 px-6 mx-auto outline-none overflow-x-hidden `}>
                        <div className='flex flex-row items-center justify-center relative border-b-[1px] py-6 border-neutral-500'>
                            <p className='text-xl font-semibold'>
                                {title}
                            </p>
                            <button onClick={closeModal} className='absolute hover:opacity-60 left-5'>
                                <FaTimes size={22} />
                            </button>
                        </div>
                        {body}
                        <Button label={actionLabel} onClick={onSubmit} disabled={disabled} />
                        <hr />
                        {footer}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;