import { create } from "zustand";
import { Member } from "../types/member";
import { HealthSurveyResult } from "../types/healthSurveyResult";
import SampleHealthSurveyData from "@/assets/data/sampleHealthSurveyResult.json";

interface UserStore {
    member: Member | null,
    basicInfo: HealthSurveyResult | null,
    // loginAsMember: (member: Member, basicInfo: HealthSurveyResult) => void,
    loginAsMember: (member: Member) => void, // TEMP DEBUG - must use the line above instead
    logout: () => void,
    updateMemberData: (member: Member) => void,
    updateBasicInfo: (basicInfo: HealthSurveyResult) => void,
}

export const useUserStore = create<UserStore>((set) => ({
    member: null,
    basicInfo: SampleHealthSurveyData, // TODO set null by default
    // loginAsMember: (member: Member, basicInfo: HealthSurveyResult) => set({ member: member, basicInfo: basicInfo }),
    loginAsMember: (member: Member) => set({ member: member }), // TEMP DEBUG - must use the line above instead
    logout: () => set({ member: null, basicInfo: null }),
    updateMemberData: (member: Member) => set({ member: member }),
    updateBasicInfo: (basicInfo: HealthSurveyResult) => set({ basicInfo: basicInfo }),
}));