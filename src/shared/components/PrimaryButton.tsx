import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function PrimaryButton({
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
                cn(className, "w-full p-8 mt-3 text-3xl text-white font-semibold rounded-lg", 
                    disabled ? "bg-blue-300" : "bg-blue-500", 
                    shadow ? "shadow-lg" : "")
            }
        >
            {label}
        </motion.button>
    );
}
