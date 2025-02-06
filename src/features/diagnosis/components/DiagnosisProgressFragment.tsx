import { useEffect, useState } from "react";

import { AnswerButton } from "@/components/custom/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import DiagnosisProgressToolBar from "./DiagnosisProgressToolBar";

export default function DiagnosisProgressFragment() {
    const { surveyState } = useDiagnosisStore();

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    useEffect(() => {
        setTappedButtonIdx(null);
    }, [surveyState.currentIndex]);

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
    }

    return (
        // fragment container
        <div className="w-full h-full flex flex-col justify-center px-8">
            {/* Question Text */}
            <div className="h-1/4">
                <h1 className="w-full text-center text-4xl font-bold text-black mt-14">
                    {
                        surveyState.surveyQuestions.questions[
                            surveyState.currentIndex
                        ]
                    }
                </h1>
                {/* Progress indicator */}
            </div>

            <div className="w-full h-2/4">
                {surveyState.surveyQuestions.options.map((_, idx) => (
                    <AnswerButton
                        key={idx}
                        label={surveyState.surveyQuestions.options[idx]}
                        isSelected={tappedButtonIdx === idx}
                        handleTap={() => handleAnswerTap(idx)}
                    />
                ))}
            </div>
            <DiagnosisProgressToolBar selectedIdx={tappedButtonIdx} />
        </div>
    );
}
