export default function SelectableLanguageButton({
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
            className={`w-24 h-full rounded-sm py-2 font-bold text-4xl ${
                isSelected
                    ? "bg-blue-300 text-white border border-blue-500"
                    : "bg-slate-100 text-black"
            }`}
        >
            {label}
        </button>
    );
}
