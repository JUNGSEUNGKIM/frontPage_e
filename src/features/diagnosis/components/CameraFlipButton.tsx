import { motion } from "motion/react";
import CameraFlipIcon from "@/assets/icons/cameraFlip.png";
import { useCameraStore } from "@/shared/stores/cameraStore";

export function CameraFlipButton() {
    const { isCameraMirrored, setIsCameraMirrored } = useCameraStore();

    return (
        <motion.button 
            className="bg-white rounded-full m-4 absolute opacity-50" 
            // whileTap={{ scaleX: 0, scaleY: 0.95 }} // animation disabled due to high resource consumption in diagnosis page
            onClick={() => setIsCameraMirrored(!isCameraMirrored)}
        >
            <img src={CameraFlipIcon} className="w-12 h-12 m-2"/>
        </motion.button>
    );
}