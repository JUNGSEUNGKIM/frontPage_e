import { DiagnosisType, SurveyState } from "@/types";
import { create } from "zustand";

interface DiagnosisStore {
    // states
    currentDiagnosis: DiagnosisType;
    surveyState: SurveyState;
    // functions
    selectDiagnosis: (value: DiagnosisType) => void;
    /// set survey with given questions and options
    setSurvey: (questions: string[], options: string[]) => void;
    /// end survey
    stopSurvey: () => void;
    /// go previous question
    goPrevious: () => void;
    /// answer current question
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

    // TODO: Check array indexing
    answerQuestion: (response) =>
        set((state) => {
            const updatedResponses = [...state.surveyState.responses];
            updatedResponses[state.surveyState.currentIndex] = response;
            const nextIdx = state.surveyState.currentIndex + 1;

            if (nextIdx >= state.surveyState.surveyQuestions.questions.length) {
                return {
                    ...state,
                    surveyState: {
                        ...state.surveyState,
                        responses: updatedResponses,
                        status: "done",
                    },
                };
            } else {
                return {
                    ...state,
                    surveyState: {
                        ...state.surveyState,
                        responses: updatedResponses,
                        currentIndex: nextIdx,
                    },
                };
            }
        }),
}));
