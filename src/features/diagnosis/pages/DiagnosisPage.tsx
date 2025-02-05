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
import DiagnosisProgressFragment from "../components/DiagnosisProgressFragment";

export function DiagnosisPage() {
    // i18n hook
    const [t] = useTranslation();

    const currentTab = useTabStore((state) => state.currentTab);
    const { currentDiagnosis, surveyState } = useDiagnosisStore();

    // get i10n strings
    // const DEPRESSIONQUESTIONS = getDepressionQuestions(t);
    // const DEPRESSIONOPTIONS = getDepressionOptions(t);
    // const DEMENTIAQUESTIONS = getDementiaQuestions(t);
    // const DEMENTIAOPTIONS = getDementiaOptions(t);

    const hrRef = useRef<string[]>([]);

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
                            <DiagnosisProgressFragment />
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
