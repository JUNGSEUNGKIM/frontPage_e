import { motion } from "motion/react";

export default function PrimaryButton({
    label,
    onClick,
    disabled = false,
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={false || false}
            className="w-full p-8 mt-3 text-3xl text-white font-semibold bg-blue-500 rounded-lg"
        >
            {label}
        </motion.button>
    );
}
