import { motion } from "motion/react";

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
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`w-24 h-full rounded-sm py-2 font-bold text-4xl ${
                isSelected
                    ? "bg-blue-300 text-white border border-blue-500"
                    : "bg-slate-100 text-black"
            }`}
        >
            {label}
        </motion.button>
    );
}
