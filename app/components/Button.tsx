'use client'

import { IconType } from "react-icons";

interface ButtonProps {
    label?: string,
    icon?: IconType,
    outline?: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({ label, icon: Icon, outline, onClick, disabled}) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 text-lg py-2 font-semibold disabled:cursor-not-allowed w-full rounded-lg hover:cursor-pointer hover:opacity-70 mb-6  ${outline ? 'bg-neutral-300' : 'bg-blue-500'} ${!outline && 'text-white'} ${outline ? 'border-black' : 'border-blue-700'}`}>
            {Icon && (
                <Icon size={24} className="absolute left-4"/>
            )}
            {label}
        </button>
    )
}

export default Button;