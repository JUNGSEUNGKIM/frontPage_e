export default function TapButton({
    label,
    isSelected,
    onClick,
}: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}) {
    // conditional classNames
    const selectedColor = "bg-blue-500 text-white border-blue-500";
    const unselectedColor = "bg-white text-black border-slate-200";

    return (
        <button
            onClick={onClick}
            className={`w-24 py-2 text-lg rounded-lg border ${
                isSelected ? selectedColor : unselectedColor
            }`}
        >
            {label}
        </button>
    );
}
