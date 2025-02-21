import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

// components
import PrimaryButton from "@/shared/components/PrimaryButton";
import DiagnosisSelectableButton from "./DiagnosisSelectableButton";

// services
import { useDepressionSurveyGet, useDementiaSurveyGet } from "../services/surveyService";

// types
import { Survey } from "@/types";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { UseQueryResult } from "@tanstack/react-query";

export default function SelectDiagnosisFragment() {
    const [t] = useTranslation();

    const { currentDiagnosis, selectDiagnosis, setSurvey, surveyState } = useDiagnosisStore();

    const depressionSurvey = useDepressionSurveyGet();
    const dementiaSurvey = useDementiaSurveyGet();

    const getSelectedSurvey = (): UseQueryResult<any, Error> | null => {
        switch (currentDiagnosis) {
            case "depression": return depressionSurvey;
            case "dementia": return dementiaSurvey;
            default: return null;
        }
    } 

    return (
        <div className="w-full h-full flex flex-col items-center gap-4 px-4">
            <h1 className="text-black text-5xl font-bold animate-pulse my-8">
                {t("chooseDiagnosisTypeLabel")}
            </h1>

            <div className="w-full h-2/3 flex flex-row gap-4">
                <DiagnosisSelectableButton
                    isSelected={currentDiagnosis === "depression"}
                    onClick={() => {
                        if (currentDiagnosis !== "depression") {
                            selectDiagnosis("depression");
                        }
                    }}
                    emojiSrc={Crying}
                    label={t("DepressionDiagnosisLabel")}
                    description={t("depressionDescription")}
                />
                <DiagnosisSelectableButton
                    isSelected={currentDiagnosis === "dementia"}
                    onClick={() => {
                        if (currentDiagnosis !== "dementia") {
                            selectDiagnosis("dementia");
                        }
                    }}
                    emojiSrc={Thinking}
                    label={t("DementiaDiagnosisLabel")}
                    description={t("dementiaDescription")}
                />
            </div>

            <PrimaryButton
                label={
                    getSelectedSurvey() === null ?  t("diagnosisNotSelected") 
                    : getSelectedSurvey()?.isSuccess ? t("btnStartDiagnosis") 
                    : getSelectedSurvey()?.isError ? t("errorLabel")
                    : t("diagnosisLoading")
                }
                disabled={getSelectedSurvey() === null || surveyState.status === "onProgress" || !getSelectedSurvey()?.isSuccess}
                onClick={() => setSurvey(getSelectedSurvey()?.data)}
            />
        </div>
    );
}
