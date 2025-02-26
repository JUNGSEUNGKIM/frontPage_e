import { create } from "zustand";

interface CameraStore {
    isCameraMirrored: boolean;
    setIsCameraMirrored: (isCameraMirrored: boolean) => void;
}

export const useCameraStore = create<CameraStore>((set) => ({
    isCameraMirrored: false,
    setIsCameraMirrored: (newValue) => set({ isCameraMirrored: newValue }),
}));
