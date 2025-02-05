import { DiagnosisType, SurveyState } from "@/types";
import { create } from "zustand";

interface DiagnosisStore {
    // states
    currentDiagnosis: DiagnosisType;
    surveyState: SurveyState;
    // functions
    selectDiagnosis: (value: DiagnosisType) => void;
    setSurvey: (questions: string[], options: string[]) => void;
    stopSurvey: () => void;
    goPrevious: () => void;
    answerQuestion: (response: number) => void;
}

export const useDiagnosisStore = create<DiagnosisStore>((set) => ({
    // initial selected diagnosis type == null
    currentDiagnosis: null,
    // initial survey state
    surveyState: {
        status: "init",
        currentIndex: 0,
        responses: [],
        surveyQuestions: { questions: [], options: [] },
    },
    selectDiagnosis: (value) => set({ currentDiagnosis: value }),
    setSurvey: (questions, options) =>
        set((state) => ({
            surveyState: {
                ...state.surveyState, // 기존 상태 유지
                status: "onProgress",
                surveyQuestions: { questions, options },
            },
        })),
    stopSurvey: () =>
        set((state) => ({
            surveyState: {
                ...state.surveyState,
                status: "done",
            },
        })),

    goPrevious: () =>
        set((state) => ({
            ...state,
            surveyState: {
                ...state.surveyState,
                currentIndex: Math.max(state.surveyState.currentIndex - 1, 0),
            },
        })),

    answerQuestion: (response) =>
        set((state) => {
            if (
                state.surveyState.responses[state.surveyState.currentIndex] !=
                null
            ) {
                const updatedResponses = [...state.surveyState.responses];
                updatedResponses[state.surveyState.currentIndex] = response;
            }

            return { ...state };
        }),
}));
