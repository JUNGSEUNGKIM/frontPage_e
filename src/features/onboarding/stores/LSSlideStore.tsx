import { create } from "zustand";
import { LSSlideData } from "../types";
import { slideData } from "./LSSlideDataStore";

interface LSSlideStore {
    currentSlide: LSSlideData;
    currentSlideIndex: number;
    changeSlide: (index: number) => void;
}

export const useSlideStore = create<LSSlideStore>((set) => ({
    currentSlide: slideData[0],
    currentSlideIndex: 0,
    changeSlide: (index) => set({ 
        currentSlide: slideData[index],
        currentSlideIndex: index,
    }),
}));
