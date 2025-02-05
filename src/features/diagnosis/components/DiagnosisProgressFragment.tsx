import { useState } from "react";

import { AnswerButton } from "@/components/custom/AnswerButton";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

export default function DiagnosisProgressFragment() {
    const { surveyState } = useDiagnosisStore();

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
        setTimeout(() => {
            setTappedButtonIdx(null);
            answerQuestion(idx);
        }, 1000);
    }

    return (
        <div>
            <div className="w-full h-[13vh] mt-4 p-6 bg-white border-slate-300 rounded-lg">
                <div className="h-full flex flex-col justify-center items-center">
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
            <div className="mt-[5vh] mb-[1vh] gap-0">
                <Button
                    w="30%"
                    h="3vh"
                    color="white"
                    fontSize="l"
                    fontWeight="bold"
                    bg={palettes.primary}
                    borderColor={palettes.primary}
                    borderWidth={2}
                    borderRadius={12}
                    onClick={() => {
                        // if (
                        //     surveyState.currentIndex === 0
                        // ) {
                        //     initSurvey();
                        // }
                        // goBack();
                    }}
                    className="shadow"
                >
                    {t("btnPrev")}
                </Button>
            </div>
            <div className="h-[10vh]" />
            <Button
                w="100%"
                h="3vh"
                bg="white"
                fontWeight="bold"
                borderColor={palettes.grey}
                // borderWidth={2}
                borderRadius={12}
                color="black"
                fontSize="l"
                onClick={() => {}}
                className="shadow"
            >
                {t("btnStop")}
            </Button>
        </div>
    );
}
