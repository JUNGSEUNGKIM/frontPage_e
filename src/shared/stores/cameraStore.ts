import isLandScape from "@/utls/is_landscape";
import { create } from "zustand";

interface CameraStore {
    isCameraMirrored: boolean;
    setIsCameraMirrored: (isCameraMirrored: boolean) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
    isCameraMirrored: isLandScape(),
    setIsCameraMirrored: (newValue) => set({ isCameraMirrored: newValue }),
}));
