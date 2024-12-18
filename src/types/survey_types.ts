export type SurveyStatus = "init" | "onProgress" | "done";

export interface SurveyQuestions {
    // survey questions
    questions: string[];
    // options might be 3 or 4
    options: string[];
}

export interface SurveyState {
    status: SurveyStatus;
    currentIndex: number;
    responses: number[];
    surveyQuestions: SurveyQuestions;
}
