import { DiagnosisType, Survey, SurveyState } from "@/types";
import { create } from "zustand";

interface DiagnosisStore {
    // states
    currentDiagnosis: DiagnosisType;
    surveyState: SurveyState;
    // functions
    selectDiagnosis: (value: DiagnosisType) => void;
    /// set survey with given questions and options
    setSurvey: (survey: Survey | undefined) => void;
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
        survey: {
            survey_id: 0,
            title: "",
            title_en: "",
            description: "",
            description_en: "",
            image_url: "",
            organization: {
                organization_id: 0
            },
            questions: [{
                question_id: 0,
                question_text: "",
                question_text_en: "",
                question_type: "",
                choices: [{
                    choice_value: "",
                    choice_label: "",
                    choice_label_en: "",
                    choice_order: 0,
                }]
            }]
        },
    },
    selectDiagnosis: (value) => set({ currentDiagnosis: value }),
    setSurvey: (survey) =>
        set((state) => ({
            surveyState: {
                ...state.surveyState, // 기존 상태 유지
                status: "onProgress",
                survey: survey || state.surveyState.survey,
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

            if (nextIdx >= state.surveyState.survey.questions.length) {
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
