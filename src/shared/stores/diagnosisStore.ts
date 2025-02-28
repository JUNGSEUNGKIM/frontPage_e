import { DiagnosisType, Survey, SurveyState } from "@/types";
import { create } from "zustand";
import healthSurvey from "@/assets/data/healthSurvery.json";

interface DiagnosisStore {
    // states
    currentDiagnosis: DiagnosisType;
    surveyState: SurveyState;
    // functions
    init: () => void;
    selectDiagnosis: (value: DiagnosisType) => void;
    /// start shared survey
    startHealthSurvey: () => void;
    /// go to survey selection page
    chooseSurvey: () => void;
    /// set survey with given questions and options
    setSurvey: (survey: Survey | undefined) => void;
    /// end survey
    stopSurvey: () => void;
    /// go previous question
    goPrevious: () => void;
    /// answer current question
    answerQuestion: (response: any) => void;
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
            organization_id: 0,
            questions: [
                {
                    question_id: 0,
                    question_text: "",
                    question_text_en: "",
                    question_type: "",
                    choices: [
                        {
                            choice_value: "",
                            choice_label: "",
                            choice_label_en: "",
                            choice_order: 0,
                        },
                    ],
                },
            ],
        },
    },
    init: () =>
        set({
            currentDiagnosis: null,
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
                    organization_id: 0,
                    questions: [
                        {
                            question_id: 0,
                            question_text: "",
                            question_text_en: "",
                            question_type: "",
                            choices: [
                                {
                                    choice_value: "",
                                    choice_label: "",
                                    choice_label_en: "",
                                    choice_order: 0,
                                },
                            ],
                        },
                    ],
                },
            },
        }),
    selectDiagnosis: (value) => set({ currentDiagnosis: value }),
    startHealthSurvey: () =>
        set((state) => ({
            surveyState: {
                ...state.surveyState, // 기존 상태 유지
                status: "healthSurvey",
                survey: healthSurvey,
                responses: [],
            },
        })),
    chooseSurvey: () =>
        set((state) => ({
            surveyState: {
                ...state.surveyState, // 기존 상태 유지
                status: "selection",
            },
        })),
    setSurvey: (survey) =>
        set((state) => ({
            surveyState: {
                ...state.surveyState, // 기존 상태 유지
                status: "inProgress",
                responses: [],
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
