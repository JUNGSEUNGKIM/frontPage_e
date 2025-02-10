import { motion } from "motion/react";

export default function OnboardingButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className="w-5/6 py-8 bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white text-4xl"
        >
            <h1>{label}</h1>
        </motion.button>
    );
}
