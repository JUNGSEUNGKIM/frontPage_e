import { clsx } from "clsx";
import { motion } from "motion/react";

interface AnswerButtonProps {
    label: string;
    isSelected: boolean;
    handleTap: () => void;
    isSmall?: boolean;
}

export function AnswerButton({
    label,
    isSelected,
    handleTap,
    isSmall = false,
}: AnswerButtonProps) {
    const selectedClassName = "bg-blue-50 border-blue-500 shadow-lg";
    const unselectedClassName = "bg-white border-white";
    return (
        <motion.button
            onClick={handleTap}
            whileTap={{ scale: 0.95 }}
            className={clsx(
                "w-full flex flex-row justify-center rounded-2xl mt-4 border transition",
                isSelected ? selectedClassName : unselectedClassName,
                isSmall ? "p-5" : "p-6"
            )}
        >
            <h1
                className={clsx(
                    "w-full font-bold text-center text-black",
                    isSmall ? "text-xl" : "text-2xl"
                )}
            >
                {label}
            </h1>
        </motion.button>
    );
}
