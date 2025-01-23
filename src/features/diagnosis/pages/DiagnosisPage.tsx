import { useState, useRef } from "react";
import palettes from "@/constants/colors";
import { AnswerButton } from "@/components/custom/AnswerButton";
import { Button } from "@/components/ui/button";
import { RppgMeasurementList } from "@/components/custom/RppgResults";

import FaceDetectionApp from "@/components/FaceDetectionApp15";

import { RPPGMeasurement } from "@/types/rppg_types";
import { useSurvey } from "@/hooks/useSurvey";

import { useNavigate } from "react-router";
import { DiagnosisDone } from "@/components/fragment/DiagnosisDone";
import { ChatFragment } from "../../../components/fragment/ChatFragment";
import { DiagnosisType } from "@/types";
import DtxFragmentV2 from "../../../components/fragment/DtxFragmentV2";
import { useTranslation } from "react-i18next";

// components
import { DiagnosisSelectableButton } from "../components";
import LogoButton from "@/shared/components/LogoButton";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import PrimaryButton from "@/shared/components/PrimaryButton";
import BottomNavigationButton from "../components/BottomNavigationButton";
import { useTabStore } from "@/shared/stores/tabStore";

export function DiagnosisPage() {
    // i18n hook
    const [t] = useTranslation();

    const DEPRESSIONQUESTIONS = [
        t("depressionQuestion1"), // "Experiencing a lack of motivation or interest"
        t("depressionQuestion2"), // "Feeling down, depressed, or hopeless"
        t("depressionQuestion3"), // "Frequently sleep deprived, oversleeping, or having trouble falling asleep"
        t("depressionQuestion4"), // "Lacking energy or constantly feeling fatigued"
        t("depressionQuestion5"), // "Having poor appetite or overeating"
        t("depressionQuestion6"), // "Feeling dissatisfied with yourself, or believe that you are a failure or have let yourself or your family down"
        t("depressionQuestion7"), // "Trouble concentrating on things, such as reading the newspaper or watching television"
        t("depressionQuestion8"), // "Moving/speaking very slowly or restlessly, causing others to take notice of your behaviors"
        t("depressionQuestion9"), // "Have recently attempted or thought of self harm or committing suicide"
    ];

    const DEPRESSIONOPTIONS = [
        t("depressionOption1"), // "1. Not at all"
        t("depressionOption2"), // "2. Few days a week"
        t("depressionOption3"), // "3. About half of a week"
        t("depressionOption4"), // "4. Nearly every day"
    ];

    const DEMENTIAQUESTIONS = [
        t("dementiaQuestion1"), // "Having difficulty recalling recent past events"
        t("dementiaQuestion2"), // "Easily forget things you heard a few days ago"
        t("dementiaQuestion3"), // "Having trouble breaking and changing the pattern in repetitive daily activities"
        t("dementiaQuestion4"), // "Forgetting things that are personally important"
        t("dementiaQuestion5"), // "Repetitively doing something and then forgetting about it"
        t("dementiaQuestion6"), // "Forgetting promises you have made"
        t("dementiaQuestion7"), // "Forgetting the topic while having a conversation"
        t("dementiaQuestion8"), // "Unable to immediately think of what to say or express"
        t("dementiaQuestion9"), // "Unable to quickly recall the names of everyday objects"
        t("dementiaQuestion10"), // "Having difficulty understanding the content of television shows"
        t("dementiaQuestion11"), // "Unable to recall the places you have visited"
        t("dementiaQuestion12"), // "Having been lost or wandering"
        t("dementiaQuestion13"), // "Having difficulty solving simple math problems"
        t("dementiaQuestion14"), // "Making mistakes in managing money"
        t("dementiaQuestion15"), // "Having difficulty using equipment that you have used in the past"
    ];

    const DEMENTIAOPTIONS = [
        t("dementiaOption1"), // "1. Not at all"
        t("dementiaOption2"), // "2. Sometimes"
        t("dementiaOption3"), // "3. Often"
    ];

    const navigate = useNavigate();
    // current tap

    const [selectedDiagnosis, setSelectedDiagnosis] =
        useState<DiagnosisType>("Depression");

    const hrRef = useRef<string[]>([]);

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    const { state, startSurvey, initSurvey, answerQuestion, goBack } =
        useSurvey();

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
            answerQuestion(idx);
        }, 1000);
    }

    function handleGoPreviousPage() {
        navigate(-1);
    }

    const currentTab = useTabStore((state) => state.currentTab);

    return (
        <div className="w-full h-screen flex flex-col bg-[#f8f8f8]">
            {/* TODO: extract Appbar widget */}
            <div className="w-full flex flex-row justify-between mt-4 mr-4 mb-8">
                {/* Logo Button */}
                <LogoButton onClick={handleGoPreviousPage} />
            </div>

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
                        {state.status === "init" && (
                            <div className="w-full h-full flex flex-col items-center gap-4 px-4">
                                <h1 className="text-black text-5xl font-bold animate-pulse my-8">
                                    {t("chooseDiagnosisTypeLabel")}
                                </h1>

                                <div className="w-full h-2/3 flex flex-row gap-4">
                                    <DiagnosisSelectableButton
                                        isSelected={
                                            selectedDiagnosis === "Depression"
                                        }
                                        onClick={() => {
                                            if (
                                                selectedDiagnosis !==
                                                "Depression"
                                            ) {
                                                setSelectedDiagnosis(
                                                    "Depression"
                                                );
                                            }
                                        }}
                                        emojiSrc={Crying}
                                        label={t("DepressionDiagnosisLabel")}
                                        description={t("depressionDescription")}
                                    />
                                    <DiagnosisSelectableButton
                                        isSelected={
                                            selectedDiagnosis === "Dementia"
                                        }
                                        onClick={() => {
                                            if (
                                                selectedDiagnosis !== "Dementia"
                                            ) {
                                                setSelectedDiagnosis(
                                                    "Dementia"
                                                );
                                            }
                                        }}
                                        emojiSrc={Thinking}
                                        label={t("DementiaDiagnosisLabel")}
                                        description={t("dementiaDescription")}
                                    />
                                </div>
                                <PrimaryButton
                                    label={t("btnStartDiagnosis")}
                                    onClick={() => {
                                        let questions = DEPRESSIONQUESTIONS;
                                        let options = DEPRESSIONOPTIONS;
                                        if (selectedDiagnosis === "Dementia") {
                                            questions = DEMENTIAQUESTIONS;
                                            options = DEMENTIAOPTIONS;
                                        }
                                        startSurvey(questions, options);
                                    }}
                                />
                            </div>
                        )}
                        {state.status === "onProgress" && (
                            <>
                                <div className="w-full h-[13vh] mt-4 p-6 bg-white border-slate-300 rounded-lg">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <div className="h-full" />
                                        <h1 className="w-full h-1/2 text-center text-4xl font-bold text-black">
                                            {
                                                state.surveyQuestions.questions[
                                                    state.currentIndex
                                                ]
                                            }
                                        </h1>
                                        <div className="h-full" />
                                        <p className="text-black">
                                            {`${state.currentIndex + 1} / ${
                                                state.surveyQuestions.questions
                                                    .length
                                            }`}
                                        </p>
                                        <div className="h-full" />
                                    </div>
                                </div>
                                {state.surveyQuestions.options.map((_, idx) => (
                                    <AnswerButton
                                        key={idx}
                                        label={
                                            state.surveyQuestions.options[idx]
                                        }
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
                                            if (state.currentIndex === 0) {
                                                initSurvey();
                                            }
                                            goBack();
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
                                    onClick={handleGoPreviousPage}
                                    className="shadow"
                                >
                                    {t("btnStop")}
                                </Button>
                            </>
                        )}
                        {state.status === "done" && (
                            <DiagnosisDone
                                rppgMesurement={measurement}
                                hrValues={hrRef.current}
                                selectedDiagnosisType={selectedDiagnosis}
                                answers={state.responses}
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

function BottomNavigator() {
    const currentTab = useTabStore((state) => state.currentTab);
    const changeTab = useTabStore((state) => state.changeTab);
    // const [currentTab, changeTab] = useTabStore((state) => [
    //     state.currentTab,
    //     state.changeTab,
    // ]);

    return (
        <div className="w-full h-1/6 flex flex-row items-center justify-between rounded-t-3xl bg-white shadow-2xl px-72">
            <BottomNavigationButton
                label="Diagnosis"
                isSelected={currentTab === "diagnosis"}
                onClick={() => {
                    changeTab("diagnosis");
                }}
                tabIconType="search"
            />
            <BottomNavigationButton
                label="DTx"
                isSelected={currentTab === "dtx"}
                onClick={() => {
                    changeTab("dtx");
                }}
                tabIconType="dtx"
            />
            <BottomNavigationButton
                label="AI Chat"
                isSelected={currentTab === "chat"}
                onClick={() => {
                    changeTab("chat");
                }}
                tabIconType="aichat"
            />
        </div>
    );
}
