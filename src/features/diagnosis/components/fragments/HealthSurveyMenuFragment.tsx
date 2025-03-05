import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

// components
import PrimaryButton from "@/shared/components/PrimaryButton";
import DiagnosisSelectableButton from "../DiagnosisSelectableButton";

// services
import { useDepressionSurveyGet, useDementiaSurveyGet } from "../../services/surveyService";

// types
import { Survey } from "@/types";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { UseQueryResult } from "@tanstack/react-query";
import { useUserStore } from "@/shared/stores/userStore";
import SecondaryButton from "@/shared/components/SecondaryButton";
import StethoscopeIcon from "@/assets/animations/stethoscope.png";
import healthSurvey from "@/assets/data/healthSurvery.json";

export default function DiagnosisStartFragment() {
    const [t] = useTranslation();

    const { currentDiagnosis, openSleepQualitySurvey, startHealthSurvey, setSurvey } = useDiagnosisStore();
    const { member, basicInfo } = useUserStore();

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
                {t("startHealthSurvey")}
            </h1>

            <div className="w-full h-2/3 flex flex-col gap-4 rounded-lg p-4 items-center justify-center bg-white">
                <h2 className="font-bold text-2xl text-black">
                    {t("healthSurveyLabel")}
                </h2>
                <img src={StethoscopeIcon} className="w-44 h-44 mt-10 mb-4" />
                <p className="text-black text-xl text-center whitespace-pre-line">
                    {t("healthSurveyDescription")}
                </p>
            </div>

            { member && basicInfo ?
                <div className="w-full flex gap-4">
                    <SecondaryButton
                        label={t("btnSkip")}
                        onClick={() => openSleepQualitySurvey()}
                    />
                    <PrimaryButton
                        label={t("btnRetake")}
                        onClick={() => startHealthSurvey()}
                    />
                </div>
                :
                <PrimaryButton
                    label={t("btnStart")}
                    onClick={() => startHealthSurvey()}
                />
            }
            
        </div>
    );
}