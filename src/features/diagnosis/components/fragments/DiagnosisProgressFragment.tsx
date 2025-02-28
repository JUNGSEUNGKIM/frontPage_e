import { useEffect, useState } from "react";

import { AnswerButton } from "@/components/custom/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import DiagnosisProgressToolBar from "../DiagnosisProgressToolBar";
import { motion } from "motion/react";

export default function DiagnosisProgressFragment() {
    // use diagnosis store
    const { surveyState } = useDiagnosisStore();

    // local state : 사용자가 선택한 탭
    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    // currentIndex 변화할 때마다 null 값으로 변경
    // TODO: 이전에 선택했던 값 남기기?
    useEffect(() => {
        setTappedButtonIdx(null);
    }, [surveyState.currentIndex]);

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
    }

    // 진행된 퍼센트 계산
    const progressPercentage =
        (surveyState.currentIndex /
            surveyState.survey.questions.length) *
        100;

    return (
        // fragment container
        <div className="w-full h-full flex flex-col justify-center px-8">
            {/* Question Text */}
            <div className="h-1/4 flex flex-col items-center gap-10">
                <h1 className="w-full h-2/5 text-center text-4xl font-bold text-black mt-14">
                    {
                        surveyState.survey.questions[surveyState.currentIndex].question_text
                    }
                </h1>
                {/* Progress indicator */}
                <div className="w-11/12 h-[0.4rem] bg-[#d9d9d9]">
                    <motion.div
                        animate={{ width: `${progressPercentage}%` }}
                        className="w-0 h-full bg-blue-500"
                    />
                </div>
            </div>
            {/* Answer Buttons */}
            <div className="w-full h-2/4">
                {surveyState.survey.questions[surveyState.currentIndex].choices.map((_, idx) => (
                    <AnswerButton
                        key={idx}
                        label={surveyState.survey.questions[surveyState.currentIndex].choices[idx].choice_label}
                        isSelected={tappedButtonIdx === idx}
                        handleTap={() => handleAnswerTap(idx)}
                    />
                ))}
            </div>
            <DiagnosisProgressToolBar selectedIdx={tappedButtonIdx} />
        </div>
    );
}
