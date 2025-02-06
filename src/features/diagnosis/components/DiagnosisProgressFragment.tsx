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
        <div className="w-full flex flex-col justify-center items-center px-8">
            <div className="w-full h-[30vh] mt-4 p-6 bg-white border-slate-300 rounded-lg">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="h-full" />
                    <h1 className="w-full h-1/2 text-center text-4xl font-bold text-black">
                        {
                            surveyState.surveyQuestions.questions[
                                surveyState.currentIndex
                            ]
                        }
                    </h1>
                    <div className="h-full" />
                    <p className="text-black">
                        {`${surveyState.currentIndex + 1} / ${
                            surveyState.surveyQuestions.questions.length
                        }`}
                    </p>
                    <div className="h-full" />
                </div>
            </div>
            {surveyState.surveyQuestions.options.map((_, idx) => (
                <AnswerButton
                    key={idx}
                    label={surveyState.surveyQuestions.options[idx]}
                    isSelected={tappedButtonIdx === idx}
                    handleTap={() => handleAnswerTap(idx)}
                />
            ))}
            <div className="h-full" />
            <DiagnosisProgressToolBar selectedIdx={tappedButtonIdx} />
        </div>
    );
}
