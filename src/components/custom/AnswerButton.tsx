interface AnswerButtonProps {
    label: string;
    isSelected: boolean;
    handleTap: () => void;
}

export function AnswerButton({
    label,
    isSelected,
    handleTap,
}: AnswerButtonProps) {
    const selectedClassName = "bg-blue-500";
    return (
        <button
            onClick={handleTap}
            className={`w-full p-4 rounded-lg mt-4 shadow ${
                isSelected ? selectedClassName : ""
            }`}
        >
            <h1
                className={`w-1/5 text-2xl font-bold text-start ${
                    isSelected ? "white" : "black"
                }`}
            >
                {label}
            </h1>
        </button>
    );
}
