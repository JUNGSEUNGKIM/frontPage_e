import { motion } from "motion/react";
import LogoutIcon from "@/assets/icons/logout.svg";

interface LogoutButtonProps {
    onClick: () => void,
}

export function LogoutButton({ onClick }: LogoutButtonProps) {
    return (
        <motion.button
            className="mr-4"
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <img className="w-12" src={LogoutIcon} />
        </motion.button>
    );
}