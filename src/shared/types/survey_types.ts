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
    survey: Survey;
}

export type DiagnosisType = null | "depression" | "dementia";

export interface Survey {
    survey_id: 0,
    title: string,
    title_en: string,
    description: string,
    description_en: string,
    image_url: string,
    organization: {
      organization_id: 0
    },
    questions: [
      {
        question_id: 0,
        question_text: string,
        question_text_en: string,
        question_type: string,
        choices: [
          {
            choice_value: string,
            choice_label: string,
            choice_label_en: string,
            choice_order: 0
          }
        ]
      }
    ]
  }