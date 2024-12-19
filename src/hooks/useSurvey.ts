import { SurveyState } from "@/types";
import { useState } from "react";
import { DEPRESSIONQUESTIONS, DEPRESSIONOPTIONS } from "@/constants/questions";

export function useSurvey() {
    const [state, setState] = useState<SurveyState>({
        status: "done",
        currentIndex: 0,
        responses: [],
        surveyQuestions: {
            questions: DEPRESSIONQUESTIONS,
            options: DEPRESSIONOPTIONS,
        },
    });

    const startSurvey = (questions: string[], options: string[]) => {
        setState({
            status: "onProgress",
            currentIndex: 0,
            responses: [],
            surveyQuestions: { questions, options },
        });
    };

    const endSurvey = () => setState((prev) => ({ ...prev, status: "done" }));

    const answerQuestion = (response: number) => {
        setState((prev) => {
            const updatedResponses = [...prev.responses];
            updatedResponses[prev.currentIndex] = response;
            const nextIndex = prev.currentIndex + 1;

            return nextIndex >= prev.surveyQuestions.questions.length
                ? { ...prev, responses: updatedResponses, status: "done" }
                : {
                      ...prev,
                      responses: updatedResponses,
                      currentIndex: nextIndex,
                  };
        });
    };

    const goBack = () => {
        setState((prev) => ({
            ...prev,
            currentIndex: Math.max(prev.currentIndex - 1, 0),
        }));
    };

    return { state, startSurvey, endSurvey, answerQuestion, goBack };
}
