import { create } from "zustand";

// 가로형 세로형 모드 저장 전역 변수
interface ScreenStore {
    isLandscape: boolean;
    update: (value: boolean) => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
    isLandscape: false,
    update: (newValue) => set({ isLandscape: newValue }),
}));
