'use clinet'

interface MenuItemProps {
    label: string,
    onClick: () => void,
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
    return (
        <div onClick={onClick} className="hover:bg-neutral-100 cursor-pointer px-3 py-2 font-semibold transition">
            {label}
        </div>
    )
}

export default MenuItem;