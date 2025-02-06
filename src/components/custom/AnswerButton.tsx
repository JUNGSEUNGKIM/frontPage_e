import { clsx } from "clsx";
import { motion } from "motion/react";

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
    const selectedClassName = "bg-blue-50 border-blue-500 shadow-lg";
    const unselectedClassName = "bg-white border-white";
    return (
        <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                "w-full flex flex-row justify-center p-6 rounded-2xl mt-4 border transition",
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
        </motion.button>
    );
}
