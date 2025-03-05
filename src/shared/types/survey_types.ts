export type SurveyStatus = "init" | "healthSurvey" | "selection" | "inProgress" | "sleepQualitySurvey" | "done";

export interface SurveyQuestions {
    // survey questions
    questions: string[];
    // options might be 3 or 4
    options: string[];
}

export interface SurveyState {
    status: SurveyStatus;
    currentIndex: number;
    responses: any[];
    survey: Survey;
}

export type DiagnosisType = null | "depression" | "dementia" | "sleepQuality";

export interface Survey {
  survey_id: number;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image_url: string | null;
  organization_id: number;
  questions: {
    question_id: number;
    question_text: string;
    question_text_en: string;
    question_type: string;
    choices: {
      choice_value: string;
      choice_label: string;
      choice_label_en: string;
      choice_order: number;
    }[];
  }[];
}