import { useState, useRef } from "react";
import palettes from "@/constants/colors";
import { AnswerButton } from "@/components/custom/AnswerButton";
import { Button } from "@/components/ui/button";
import { RppgMeasurementList } from "@/components/custom/RppgResults";

import FaceDetectionApp from "@/components/FaceDetectionApp15";

import { RPPGMeasurement } from "@/types/rppg_types";
import { useSurvey } from "@/hooks/useSurvey";

import { DiagnosisDone } from "@/components/fragment/DiagnosisDone";
import { ChatFragment } from "../../../components/fragment/ChatFragment";
import DtxFragmentV2 from "../../../components/fragment/DtxFragmentV2";
import { useTranslation } from "react-i18next";

// components

// assets
import { useTabStore } from "@/shared/stores/tabStore";

import {
    getDementiaOptions,
    getDementiaQuestions,
    getDepressionOptions,
    getDepressionQuestions,
} from "../constants";
import BottomNavigator from "../components/BottomNavigator";
import DiagnosisAppBar from "../components/DiagnosisAppBar";
import SelectDiagnosisFragment from "../components/SelectDiagnosisFragment";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

export function DiagnosisPage() {
    // i18n hook
    const [t] = useTranslation();

    // get i10n strings
    const DEPRESSIONQUESTIONS = getDepressionQuestions(t);
    const DEPRESSIONOPTIONS = getDepressionOptions(t);
    const DEMENTIAQUESTIONS = getDementiaQuestions(t);
    const DEMENTIAOPTIONS = getDementiaOptions(t);

    // current tap

    const hrRef = useRef<string[]>([]);

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    // const { initSurvey, answerQuestion, goBack } = useSurvey();

    // state for rPPG measurement
    const [measurement, setMeasurement] = useState<RPPGMeasurement>({
        hr: "0",
        hrv: "0",
        stress: "0",
        emotion: "None",
        emotionResult: {
            Angry: 0,
            Happy: 0,
            Disgusted: 0,
            Fearful: 0,
            Neutral: 0,
            Sad: 0,
            Surprised: 0,
        },
    });

    // handle rppg
    function handleMeasurement(newValue: RPPGMeasurement) {
        if (newValue.emotion === "") {
            setMeasurement({ ...newValue, emotion: "None" });
        } else {
            setMeasurement(newValue);
        }
        if (newValue.hr !== "0") {
            hrRef.current.push(newValue.hr);
        }

        console.log(hrRef.current);
    }

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
        setTimeout(() => {
            setTappedButtonIdx(null);
            // answerQuestion(idx);
        }, 1000);
    }

    const currentTab = useTabStore((state) => state.currentTab);
    const { currentDiagnosis, surveyState } = useDiagnosisStore();
    // const { currentDiagnosis, surveyState } = useDiagnosisStore((state) => ({
    //     currentDiagnosis: state.currentDiagnosis,
    //     surveyState: state.surveyState,
    // }));

    return (
        <div className="w-full h-screen flex flex-col bg-[#f8f8f8]">
            <DiagnosisAppBar />

            {/* Face Detection Part */}
            <FaceDetectionApp onValueChanged={handleMeasurement} />

            {/* <div className="h-full mt-8 px-8"> */}
            <div className="h-8" />
            {/* rPPGMeasurement Item List */}
            <RppgMeasurementList measurementValue={measurement} />

            <div className="h-5/6 flex flex-col">
                {currentTab === "diagnosis" && (
                    //TODO: fragmnet -> 화면 비율 설정해두기
                    <>
                        {surveyState.status === "init" && (
                            <SelectDiagnosisFragment />
                        )}
                        {surveyState.status === "onProgress" && (
                            <>
                                <div className="w-full h-[13vh] mt-4 p-6 bg-white border-slate-300 rounded-lg">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <div className="h-full" />
                                        <h1 className="w-full h-1/2 text-center text-4xl font-bold text-black">
                                            {
                                                surveyState.surveyQuestions
                                                    .questions[
                                                    surveyState.currentIndex
                                                ]
                                            }
                                        </h1>
                                        <div className="h-full" />
                                        <p className="text-black">
                                            {`${
                                                surveyState.currentIndex + 1
                                            } / ${
                                                surveyState.surveyQuestions
                                                    .questions.length
                                            }`}
                                        </p>
                                        <div className="h-full" />
                                    </div>
                                </div>
                                {surveyState.surveyQuestions.options.map(
                                    (_, idx) => (
                                        <AnswerButton
                                            key={idx}
                                            label={
                                                surveyState.surveyQuestions
                                                    .options[idx]
                                            }
                                            isSelected={tappedButtonIdx === idx}
                                            handleTap={() =>
                                                handleAnswerTap(idx)
                                            }
                                        />
                                    )
                                )}
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
                            </>
                        )}
                        {surveyState.status === "done" && (
                            <DiagnosisDone
                                rppgMesurement={measurement}
                                hrValues={hrRef.current}
                                selectedDiagnosisType={currentDiagnosis}
                                answers={surveyState.responses}
                            />
                        )}
                    </>
                )}
                {/* Add Chat fragment here */}
                {currentTab === "chat" && <ChatFragment />}
                {currentTab === "dtx" && <DtxFragmentV2 />}
            </div>
            <BottomNavigator />
        </div>
    );
}
