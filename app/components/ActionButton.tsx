'use client'

interface ActionButtonProps {
    label: string,
    onClick: () => void,
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className="rounded-full bg-blue-500 font-light text-white text-lg py-2 px-4 hover:cursor-pointer hover:shadow-lg ">
            {label}
        </div>
    )
}

export default ActionButton;