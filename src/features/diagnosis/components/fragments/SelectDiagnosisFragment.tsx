import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

// components
import PrimaryButton from "@/shared/components/PrimaryButton";
import DiagnosisSelectableButton from "../DiagnosisSelectableButton";

// services
import { useDepressionSurveyGet, useDementiaSurveyGet } from "../../services/surveyService";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import SleepyFace from "@/assets/animations/sleepy_face.png"
import { UseQueryResult } from "@tanstack/react-query";
import SecondaryButton from "@/shared/components/SecondaryButton";
import { ChevronLeftIcon } from "@/assets/icons/chevron_left";
import { ChevronRightIcon } from "@/assets/icons/chevron_right";

const DIAGNOSIS_COUNT = 3;

export default function SelectDiagnosisFragment() {

    const maxPages = DIAGNOSIS_COUNT - 2;

    const [t] = useTranslation();

    const [diagnosisPage, setDiagnosisPage] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const diagnosisMenuRef = useRef<HTMLDivElement>(null)

    const { currentDiagnosis, selectDiagnosis, setSurvey, surveyState, init, startSleepQualitySurvey } = useDiagnosisStore();

    const depressionSurvey = useDepressionSurveyGet();
    const dementiaSurvey = useDementiaSurveyGet();

    const getSelectedSurvey = (): UseQueryResult<any, Error> | null => {
        switch (currentDiagnosis) {
            case "depression": return depressionSurvey;
            case "dementia": return dementiaSurvey;
            default: return null;
        }
    } 

    useEffect(() => {
        if (diagnosisMenuRef.current) {
            diagnosisMenuRef.current.scrollTo({
                left: diagnosisMenuRef.current.offsetWidth * diagnosisPage * 5/6,
                behavior: 'auto', 
                // behavior: 'smooth', // animation disabled due to high resource consumption in diagnosis page
            });
        }
    }, [diagnosisPage]);

        // 좌우 넘기기 모션 감지
        useEffect(() => {
            const handleTouchStart = (event: TouchEvent) => {
            setTouchStartX(event.touches[0].clientX);
            };
    
            const handleTouchMove = (event: TouchEvent) => {
                if (touchStartX === null || !diagnosisMenuRef.current) return;
    
                const currentX = event.touches[0].clientX;
                const deltaX = currentX - touchStartX;
    
                const threshold = 50; // 드래그 최소 거리
    
                if (Math.abs(deltaX) > threshold) {
                    if (deltaX > 0) {
                        setDiagnosisPage(Math.max(diagnosisPage - 1, 0));
                    } else {
                        setDiagnosisPage(Math.min(diagnosisPage + 1, maxPages));
                    }
                    setTouchStartX(null);
                }
            };
    
            const handleTouchEnd = () => { // 손가락 뗄 경우 리셋
                setTouchStartX(null);
            }
    
            const container = diagnosisMenuRef.current;
            if (container) {
                container.addEventListener('touchstart', handleTouchStart);
                container.addEventListener('touchmove', handleTouchMove);
                container.addEventListener('touchend', handleTouchEnd);
    
                return () => {
                    container.removeEventListener('touchstart', handleTouchStart);
                    container.removeEventListener('touchmove', handleTouchMove);
                    container.removeEventListener('touchend', handleTouchEnd);
                };
            }
        }, [touchStartX]);

    const navButtonStyle = "text-blue-500";
    const disabledNavButtonStyle = "text-gray-300";

    return (
        <div className="w-full h-full flex flex-col items-center gap-4 px-4">
            <h1 className="text-black text-5xl font-bold animate-pulse my-8">
                {t("chooseDiagnosisTypeLabel")}
            </h1>

            <div className="w-full h-2/3 flex snap-x">

                <button 
                    className={diagnosisPage > 0 ? navButtonStyle : disabledNavButtonStyle} 
                    onClick={() => setDiagnosisPage(Math.max(diagnosisPage - 1, 0))}
                >
                    <ChevronLeftIcon />
                </button>

                <div className="w-full flex flex-row overflow-x-hidden snap-x" ref={diagnosisMenuRef}>
                    <DiagnosisSelectableButton
                        isSelected={currentDiagnosis === "depression"}
                        onClick={() => {
                            if (currentDiagnosis !== "depression") {
                                selectDiagnosis("depression");
                            }
                        }}
                        emojiSrc={Crying}
                        label={t("depressionDiagnosisLabel")}
                        description={t("depressionDescription")}
                    />
                    <DiagnosisSelectableButton
                        isSelected={currentDiagnosis === "sleepQuality"}
                        onClick={() => {
                            if (currentDiagnosis !== "sleepQuality") {
                                selectDiagnosis("sleepQuality");
                            }
                        }}
                        emojiSrc={SleepyFace}
                        label={t("sleepQualitySurveyLabel")}
                        description={t("sleepQualitySurveyDescription")}
                    />
                    <DiagnosisSelectableButton
                        isSelected={currentDiagnosis === "dementia"}
                        onClick={() => {
                            if (currentDiagnosis !== "dementia") {
                                selectDiagnosis("dementia");
                            }
                        }}
                        emojiSrc={Thinking}
                        label={t("dementiaDiagnosisLabel")}
                        description={t("dementiaDescription")}
                    />
                </div>

                <button 
                    className={diagnosisPage < maxPages ? navButtonStyle : disabledNavButtonStyle} 
                    onClick={() => setDiagnosisPage(Math.min(diagnosisPage + 1, maxPages))}
                >
                    <ChevronRightIcon />
                </button>

            </div>

            {/* Diagnosis start button */}
            <div className="w-full flex gap-4">
                <SecondaryButton
                    label={t("btnRestart")}
                    onClick={() => init()}
                />
                <PrimaryButton
                    label={
                        currentDiagnosis !== "sleepQuality" && getSelectedSurvey() === null ? 
                            t("diagnosisNotSelected") // Condition #1 - diagnosis not selected

                        : currentDiagnosis === "sleepQuality" || getSelectedSurvey()?.isSuccess ? 
                            t("btnStartDiagnosis") // Condition #2 - diagnosis successful

                        : getSelectedSurvey()?.isError ? t("errorLabel") // Condition #3 - diagnosis fetch error
                        : t("diagnosisLoading")
                    }
                    disabled={currentDiagnosis !== "sleepQuality" && (getSelectedSurvey() === null || surveyState.status === "inProgress" || !getSelectedSurvey()?.isSuccess)}
                    onClick={() => {
                        if (currentDiagnosis === "sleepQuality") {
                            startSleepQualitySurvey();
                        } else {
                            setSurvey(getSelectedSurvey()?.data);
                        }
                    }}
                />
            </div>
        </div>
    );
}