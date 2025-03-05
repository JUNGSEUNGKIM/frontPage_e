import { useState, useRef, useEffect } from "react";
import { RppgMeasurementList } from "@/components/custom/RppgResults";
import FaceDetectionApp from "@/components/FaceDetectionApp15";
import { RPPGMeasurement } from "@/types/rppg_types";

// stores(zustand)
import { useTabStore } from "@/shared/stores/tabStore";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

import BottomNavigator from "../components/BottomNavigator";
import DiagnosisAppBar from "../components/DiagnosisAppBar";

// fragments
import SelectDiagnosisFragment from "../components/fragments/SelectDiagnosisFragment";
import DiagnosisProgressFragment from "../components/fragments/DiagnosisProgressFragment";
import DiagnosisDoneFragment from "../components/fragments/DiagnosisDoneFragment";
import DtxFragmentV2 from "../../../components/fragment/DtxFragmentV2";
import { ChatFragment } from "../../../components/fragment/ChatFragment";
import DiagnosisSidebar from "../components/DiagnosisSidebar";
import isLandScape from "@/utls/is_landscape";
import { useModalStore } from "@/shared/stores/modalStore";
import AlertModal from "@/shared/components/AlertModal";
import { DiagnosisStartFragment, HealthSurveyFragment, SleepQualitySurveyFragment, SleepQualitySurveyMenuFragment } from "../components";
import { useHealthSurveyAnswerPost } from "@/shared/services/userService";
import { HealthSurveyResult } from "@/shared/types/healthSurveyResult";
import { useUserStore } from "@/shared/stores/userStore";

export function DiagnosisPage() {
    // stores
    const { currentTab } = useTabStore();
    const { currentDiagnosis, surveyState, chooseSurvey, openSleepQualitySurvey } = useDiagnosisStore();
    const { member } = useUserStore();
    const { isVisible } = useModalStore();

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
    }

    const mutation = useHealthSurveyAnswerPost()
    const handleSubmit = (memberId: number, responses: any[]) => {
        const updatedResponsesObject: HealthSurveyResult = {
            member_id: memberId,
            gender: responses[0],
            age: Number.parseInt(responses[1]),
            height: Number.parseFloat(responses[2]),
            weight: Number.parseFloat(responses[3]),
            regular_exercise: responses[4],
            exercise_frequency: responses[5],
            sleep_hours: responses[6],
            sleep_quality: responses[7],
            stress_level: responses[8],
            emotional_state: responses[9],
            existing_conditions: responses[10],
            medication: responses[11],
        }
        mutation.mutate({answerData: updatedResponsesObject, memberId: 1});
    }

    useEffect(() => {
        switch (surveyState.status) {
            case "healthSurvey" : if (surveyState.responses.length == 12) {
                handleSubmit(member ? member.member_id : 1, surveyState.responses);
                openSleepQualitySurvey();
            } break;
            case "sleepQualitySurvey" : if (surveyState.responses.length == 22) {
                // TODO submit responses
                chooseSurvey();
            } break;
        }
    }, [surveyState.responses])

    // TODO: error check
    // const { currentDiagnosis, surveyState } = useDiagnosisStore((state) => ({
    //     currentDiagnosis: state.currentDiagnosis,
    //     surveyState: state.surveyState,
    // }));

    return isLandScape() ? (
        <div className="w-screen h-screen flex flex-row bg-[#f8f8f8]">
            {/* modal */}
            {isVisible && <DiagnosisProgressModal />}

            {/* TODO: add measurement values as props */}
            <DiagnosisSidebar measurementValue={measurement}>
                <FaceDetectionApp onValueChanged={handleMeasurement} />
            </DiagnosisSidebar>

            <div className="w-[70%] flex flex-col px-4">
                {/* Tab-based Fragments */}
                {currentTab === "diagnosis" && (
                    <>

                        {surveyState.status === "init" && (
                            <DiagnosisStartFragment />
                        )}

                        {surveyState.status === "healthSurvey" && (
                            <HealthSurveyFragment />
                        )}

                        {surveyState.status === "preSleepQualitySurvey" && (
                            <SleepQualitySurveyMenuFragment />
                        )}

                        {surveyState.status === "sleepQualitySurvey" && (
                            <SleepQualitySurveyFragment />
                        )}

                        {surveyState.status === "selection" && ( 
                            <SelectDiagnosisFragment />
                        )}

                        {surveyState.status === "inProgress" && (
                            <DiagnosisProgressFragment />
                        )}

                        {surveyState.status === "done" && (
                            <DiagnosisDoneFragment
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
        </div>
    ) : (
        // full screen container for vertical kiosk
        <div className="w-full h-screen flex flex-col bg-[#f8f8f8] gap-4">

            {/* modal */}
            {isVisible && <DiagnosisProgressModal />}

            <div 
                className="w-full bg-blue-500 pb-8"
                style={{
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                }}
            >

                <DiagnosisAppBar />

                {/* Face Detection Part */}
                <FaceDetectionApp onValueChanged={handleMeasurement} />

                {/* Gap */}
                <div className="h-8" />

                {/* rPPGMeasurement Item List */}
                <RppgMeasurementList measurementValue={measurement} />

            </div>

            <div className="h-5/6 flex flex-col px-4">
            
                {/* Tab-based Fragments */}
                {currentTab === "diagnosis" && (
                    <>

                        {surveyState.status === "init" && (
                            <DiagnosisStartFragment />
                        )}

                        {surveyState.status === "healthSurvey" && (
                            <HealthSurveyFragment />
                        )}

                        {surveyState.status === "preSleepQualitySurvey" && (
                            <SleepQualitySurveyMenuFragment />
                        )}

                        {surveyState.status === "sleepQualitySurvey" && (
                            <SleepQualitySurveyFragment />
                        )}

                        {surveyState.status === "selection" && ( 
                            <SelectDiagnosisFragment />
                        )}

                        {surveyState.status === "inProgress" && (
                            <DiagnosisProgressFragment />
                        )}

                        {surveyState.status === "done" && (
                            <DiagnosisDoneFragment
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
            {/* Bottom Navigtor (change Tabs) */}
            <BottomNavigator />
        </div>
    );
}

function DiagnosisProgressModal() {
    const { hideModal } = useModalStore();
    const { init, chooseSurvey, surveyState, openSleepQualitySurvey } = useDiagnosisStore();
    return (
        <AlertModal
            title="알림"
            desc="진행 중인 진단을 종료할까요?"
            onAccept={() => {
                hideModal();
                if (surveyState.status === "inProgress") chooseSurvey();
                else if (surveyState.status === "sleepQualitySurvey") openSleepQualitySurvey();
                else init();
            }}
            onCancel={() => {
                hideModal();
            }}
        />
    );
}
