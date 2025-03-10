import { useEffect, useState } from "react";

import { AnswerButton } from "@/features/diagnosis/components/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import DiagnosisProgressToolBar from "../DiagnosisProgressToolBar";
import { motion } from "motion/react";
import TimePicker from "../TimePicker";
import i18n from "@/i18n";

export default function SleepQualitySurveyFragment() {
    // use diagnosis store
    const { surveyState } = useDiagnosisStore();

    // local state : 사용자가 선택한 탭
    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    // API POST용 answer 값 저장
    const [answerValue, setAnswerValue] = useState<string>("");

    // 객관식 답 변경 시 해당하는 answer값 설정
    useEffect(() => {
        if (tappedButtonIdx != null) {
            setAnswerValue(
                surveyState.survey.questions[surveyState.currentIndex].choices[
                    tappedButtonIdx
                ].choice_value
            );
        }
    }, [tappedButtonIdx]);

    // currentIndex 변화할 때마다 값 초기화
    // TODO: 이전에 선택했던 값 남기기?
    useEffect(() => {
        setTappedButtonIdx(null);
        switch (
            surveyState.survey.questions[surveyState.currentIndex].question_type
        ) {
            case "time":
                setAnswerValue("1:0");
                break;
            case "time_am_pm":
                setAnswerValue("1:0AM");
                break;
            default:
                setAnswerValue("");
        }
    }, [surveyState.currentIndex]);

    // handling multiple choice button tap
    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
    }

    // 진행된 퍼센트 계산
    const progressPercentage =
        (surveyState.currentIndex / surveyState.survey.questions.length) * 100;

    return (
        // fragment container
        <div className="w-full h-full flex flex-col justify-center px-8">
            {/* Question Text */}
            <div className="h-1/4 flex flex-col items-center gap-10">
                <h1 className="w-full h-2/5 text-center text-4xl font-bold text-black mt-14">
                    {i18n.language === "en"
                        ? surveyState.survey.questions[surveyState.currentIndex]
                              .question_text_en
                        : surveyState.survey.questions[surveyState.currentIndex]
                              .question_text}
                </h1>
                {/* Progress indicator */}
                <div className="w-11/12 h-[0.4rem] bg-[#d9d9d9]">
                    <motion.div
                        animate={{ width: `${progressPercentage}%` }}
                        className="w-0 h-full bg-blue-500"
                    />
                </div>
            </div>

            {/* Multiple choice */}
            {surveyState.survey.questions[surveyState.currentIndex]
                .question_type === "multiple_choice" && (
                <div className="w-full h-2/4 flex flex-col">
                    {surveyState.survey.questions[
                        surveyState.currentIndex
                    ].choices.map((_, idx) => (
                        <AnswerButton
                            key={idx}
                            label={
                                i18n.language === "en"
                                    ? surveyState.survey.questions[
                                          surveyState.currentIndex
                                      ].choices[idx].choice_label_en
                                    : surveyState.survey.questions[
                                          surveyState.currentIndex
                                      ].choices[idx].choice_label
                            }
                            isSelected={tappedButtonIdx === idx}
                            handleTap={() => handleAnswerTap(idx)}
                            isSmall={
                                surveyState.survey.questions[
                                    surveyState.currentIndex
                                ].choices.length > 4
                            }
                        />
                    ))}
                </div>
            )}

            {/* Time picker */}
            {surveyState.survey.questions[surveyState.currentIndex]
                .question_type === "time" && (
                <div className="w-full h-2/4 flex flex-col">
                    <TimePicker
                        pickMeridian={false}
                        inputValue={answerValue}
                        setInputValue={setAnswerValue}
                    />
                </div>
            )}

            {/* Time picker with AM/PM selector */}
            {surveyState.survey.questions[surveyState.currentIndex]
                .question_type === "time_am_pm" && (
                <div className="w-full h-2/4 flex flex-col">
                    <TimePicker
                        pickMeridian={true}
                        inputValue={answerValue}
                        setInputValue={setAnswerValue}
                    />
                </div>
            )}

            <DiagnosisProgressToolBar
                answerValue={answerValue}
                skipDefaultValue={"null"}
                skipQuestionCount={
                    // skip rest of the survey (5 questions) if chosen 0 for 13th question
                    surveyState.currentIndex === 18 &&
                    (tappedButtonIdx === 0 || tappedButtonIdx === 1)
                        ? 5
                        : 0
                }
            />
        </div>
    );
}
