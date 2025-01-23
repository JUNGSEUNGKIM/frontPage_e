import { create } from "zustand";

import { Tab } from "../types/tab";

interface TabStore {
    currentTab: Tab;
    changeTab: (tab: Tab) => void;
}

export const useTabStore = create<TabStore>((set) => ({
    currentTab: "diagnosis",
    changeTab: (newTab) => set({ currentTab: newTab }),
}));
