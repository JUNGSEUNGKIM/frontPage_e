import { motion } from "motion/react";
import CameraFlipIcon from "@/assets/icons/cameraFlip.png";
import { useCameraStore } from "@/shared/stores/cameraStore";


export function CameraFlipButton() {
    const { isCameraMirrored, setIsCameraMirrored } = useCameraStore();

    return (
        <motion.button 
            className="bg-white rounded-full m-4 absolute opacity-50" 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCameraMirrored(!isCameraMirrored)}
        >
            <img src={CameraFlipIcon} className="w-12 h-12 m-2"/>
        </motion.button>
    );
}