import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function SecondaryButton({
    label,
    onClick,
    disabled = false,
    shadow = false,
}: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    shadow?: boolean;
}) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {if (!disabled) onClick()}}
            className={
                cn("w-full p-8 mt-3 text-3xl bg-white font-semibold rounded-lg", 
                    disabled ? "text-blue-300" : "text-blue-500", 
                    shadow ? "shadow-lg" : "")
            }
        >
            {label}
        </motion.button>
    );
}
