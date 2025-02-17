import { useTranslation } from "react-i18next";
import DiagnosisSelectableButton from "./DiagnosisSelectableButton";

// components
import PrimaryButton from "@/shared/components/PrimaryButton";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import { useEffect, useState } from "react";
import { getDementiaSurvey, getDepressionSurvey } from "../services/surveyService";
import { Survey } from "@/shared/types/survey_types";

export default function SelectDiagnosisFragment() {
    const [t] = useTranslation();

    const { currentDiagnosis, selectDiagnosis, setSurvey, surveyState } =
        useDiagnosisStore();

    const [depressionSurvey, setDepressionSurvey] = useState<Survey | undefined>();
    const [dementiaSurvey, setDementiaSurvey] = useState<Survey | undefined>();
    
    // Fetch survey questions
    useEffect(() => {
        const fetchSurveys = async () => {

            // Fetch depression survey
            try {
                const data = await getDepressionSurvey();
                setDepressionSurvey(data);
            } catch (err) {
                console.log(`error: ${err}`)
            }

            // Fetch dementia survey
            try {
                const data = await getDementiaSurvey();
                setDementiaSurvey(data);
            } catch (err) {
                console.log(`error: ${err}`)
            }
        };
        fetchSurveys();
    }, []);

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
                label={t("btnStartDiagnosis")}
                disabled={true}
                onClick={() => {
                    if (surveyState.status !== "onProgress") {
                        // 상태 확인 후 설문 시작
                        let survey = depressionSurvey;
                        if (currentDiagnosis === "dementia") {
                            survey = dementiaSurvey;
                        }
                        setSurvey(survey);
                    }
                }}
            />
        </div>
    );
}
