import { clsx } from "clsx";

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
    const selectedClassName = "bg-blue-100 border-blue-500 shadow-sm";
    const unselectedClassName = "bg-white border-white";
    return (
        <button
            onClick={handleTap}
            className={clsx(
                "w-full flex flex-row  justify-center p-4 rounded-2xl mt-4 border",
                isSelected ? selectedClassName : unselectedClassName
            )}
        >
            <h1
                className={clsx(
                    "w-full text-2xl font-bold text-center text-black"
                )}
            >
                {label}
            </h1>
        </button>
    );
}
