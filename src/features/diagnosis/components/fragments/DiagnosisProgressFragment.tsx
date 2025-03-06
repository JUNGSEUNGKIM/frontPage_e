import { useEffect, useState } from "react";

import { AnswerButton } from "@/components/custom/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import DiagnosisProgressToolBar from "../DiagnosisProgressToolBar";
import { motion } from "motion/react";
import { NumberInputField } from "../NumberInputField";
import i18n from "@/i18n";

export default function DiagnosisProgressFragment() {
    // use diagnosis store
    const { surveyState } = useDiagnosisStore();

    // local state : 사용자가 선택한 탭
    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    // local state : 사용자가 선택한 checkbox들
    const [checkboxIdx, setCheckboxIdx] = useState<number[]>([]);

    // API POST용 answer 값 저장
    const [answerValue, setAnswerValue] = useState<string>("");

    // 객관식 답 변경 시 해당하는 answer값 설정
    useEffect(() => {
        if (tappedButtonIdx != null) {
            setAnswerValue(surveyState.survey.questions[surveyState.currentIndex].choices[tappedButtonIdx].choice_value);
        }
    }, [tappedButtonIdx]);

    // currentIndex 변화할 때마다 값 초기화
    // TODO: 이전에 선택했던 값 남기기?
    useEffect(() => {
        setTappedButtonIdx(null);
        setCheckboxIdx([]);
        setAnswerValue("");
    }, [surveyState.currentIndex]);

    // handling multiple choice button tap
    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
    }

    // handling checkbox tap
    function handleAnswerCheckboxTap(idx: number) {
        const idxIndex = checkboxIdx.indexOf(idx)
        if (idxIndex === -1) { // selection
            setCheckboxIdx((curr) => [...curr, idx]);
        } else { // deselection
            setCheckboxIdx((curr) => [...curr.slice(0, idxIndex), ...curr.slice(idxIndex + 1)]);
        }
    }
    // update answer value string
    useEffect(() => {
        setAnswerValue(checkboxIdx.map((index) => surveyState.survey.questions[surveyState.currentIndex].choices[index].choice_value).join(','))
    }, [checkboxIdx]);

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
                        i18n.language === "en" ?
                            surveyState.survey.questions[surveyState.currentIndex].question_text_en
                        :
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

            { surveyState.survey.questions[surveyState.currentIndex].question_type === "number" && 
                <NumberInputField inputValue={answerValue} setInputValue={setAnswerValue}/>

            // Multiple choice boxes
            } { surveyState.survey.questions[surveyState.currentIndex].question_type === "multiple_choice" && 
                <div className="w-full h-2/4 flex flex-col">
                    {surveyState.survey.questions[surveyState.currentIndex].choices.map((_, idx) => (
                        <AnswerButton
                            key={idx}
                            label={
                                i18n.language === "en" ?
                                    surveyState.survey.questions[surveyState.currentIndex].choices[idx].choice_label_en
                                :
                                    surveyState.survey.questions[surveyState.currentIndex].choices[idx].choice_label
                            }                            isSelected={tappedButtonIdx === idx}
                            handleTap={() => handleAnswerTap(idx)}
                            isSmall={surveyState.survey.questions[surveyState.currentIndex].choices.length > 4}
                        />
                    ))}
                </div>

            // Checkboxes
            } { surveyState.survey.questions[surveyState.currentIndex].question_type === "checkbox" &&
                <div className="w-full h-2/4 flex flex-col">
                    {surveyState.survey.questions[surveyState.currentIndex].choices.map((_, idx) => (
                        <AnswerButton
                            key={idx}
                            label={
                                i18n.language === "en" ?
                                    surveyState.survey.questions[surveyState.currentIndex].choices[idx].choice_label_en
                                :
                                    surveyState.survey.questions[surveyState.currentIndex].choices[idx].choice_label
                            }                            isSelected={checkboxIdx.indexOf(idx) > -1}
                            handleTap={() => {handleAnswerCheckboxTap(idx)}}
                            isSmall={surveyState.survey.questions[surveyState.currentIndex].choices.length > 4}
                        />
                    ))}
                </div>
            }

            <DiagnosisProgressToolBar selectedIdx={tappedButtonIdx} />
        </div>
    );
}
