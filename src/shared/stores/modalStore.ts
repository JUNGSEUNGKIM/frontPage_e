import { create } from "zustand";

interface ModalStore {
    isVisible: boolean;
    showModal: () => void;
    hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isVisible: false,
    showModal: () => set({ isVisible: true }),
    hideModal: () => set({ isVisible: false }),
}));
