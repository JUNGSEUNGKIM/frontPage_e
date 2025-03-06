import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function SecondaryButton({
    label,
    onClick,
    disabled = false,
    shadow = false,
    className = "",
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    shadow?: boolean;
    className?: string;
}) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {if (!disabled) onClick()}}
            className={
                cn(className, "w-full p-8 mt-3 text-3xl bg-white font-semibold rounded-lg", 
                    disabled ? "text-gray-500" : "text-black", 
                    shadow ? "shadow-lg" : "")
            }
        >
            {label}
        </motion.button>
    );
}
