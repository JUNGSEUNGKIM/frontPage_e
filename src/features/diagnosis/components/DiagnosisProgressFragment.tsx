import { useEffect, useState } from "react";

import { AnswerButton } from "@/components/custom/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import DiagnosisProgressToolBar from "./DiagnosisProgressToolBar";
import { motion } from "motion/react";

export default function DiagnosisProgressFragment() {
    const { surveyState } = useDiagnosisStore();

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    useEffect(() => {
        setTappedButtonIdx(null);
    }, [surveyState.currentIndex]);

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
    }

    const progressPercentage =
        (surveyState.currentIndex /
            surveyState.surveyQuestions.questions.length) *
        100;

    return (
        // fragment container
        <div className="w-full h-full flex flex-col justify-center px-8">
            {/* Question Text */}
            <div className="h-1/4 flex flex-col items-center gap-10">
                <h1 className="w-full h-2/5 text-center text-4xl font-bold text-black mt-14">
                    {
                        surveyState.surveyQuestions.questions[
                            surveyState.currentIndex
                        ]
                    }
                </h1>
                {/* Progress indicator */}
                <div className="w-11/12 h-[0.4rem] bg-[#d9d9d9]">
                    <motion.div
                        animate={{ width: `${progressPercentage}%` }}
                        className="h-full bg-blue-500"
                    />
                </div>
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
