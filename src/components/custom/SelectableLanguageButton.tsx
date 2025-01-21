export function SelectableLanguageButton({
    label,
    isSelected,
    onClick,
}: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`mr-4 w-24 rounded-md py-2 font-bold ${
                isSelected ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
        >
            {label}
        </button>
    );
}
