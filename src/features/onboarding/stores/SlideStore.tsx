import { create } from "zustand";
import { SlideData } from "../types";
import { slideData } from "./SlideDataStore";

interface SlideStore {
    currentSlide: SlideData;
    currentSlideIndex: number;
    changeSlide: (index: number) => void;
}

export const useSlideStore = create<SlideStore>((set) => ({
    currentSlide: slideData[0],
    currentSlideIndex: 0,
    changeSlide: (index) => set({ 
        currentSlide: slideData[index],
        currentSlideIndex: index,
    }),
}));
