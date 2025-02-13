import { motion } from "motion/react";
// props
interface DiagnosisSelectableButtonProps {
    isSelected: boolean;
    onClick: () => void;
    emojiSrc: string;
    label: string;
    description: string;
}
export default function DiagnosisSelectableButton({
    isSelected,
    onClick,
    emojiSrc,
    label,
    description,
}: DiagnosisSelectableButtonProps) {
    // conditional classNames
    const selectedClassName = "bg-blue-50 border-blue-500";
    const unselectedClassName = "bg-white border-white";

    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            className={`w-full border-2 rounded-lg p-4 ${
                isSelected ? selectedClassName : unselectedClassName
            }`}
        >
            <div className="h-full flex flex-col items-center justify-center">
                <h2 className="font-bold text-2xl text-black">{label}</h2>
                <img src={emojiSrc} className="w-44 h-44 mt-10 mb-4" />
                <p className="text-black text-xl text-center whitespace-pre-line">
                    {description}
                </p>
            </div>
        </motion.button>
    );
}
