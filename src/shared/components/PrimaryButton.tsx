export default function PrimaryButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full h-[4vh] mt-3 text-3xl text-white bg-blue-500 rounded-lg"
        >
            {label}
        </button>
    );
}
