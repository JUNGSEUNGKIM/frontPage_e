import { useTranslation } from "react-i18next";
import DiagnosisSelectableButton from "./DiagnosisSelectableButton";
import {
    DEMENTIAOPTIONS,
    DEMENTIAQUESTIONS,
    DEPRESSIONOPTIONS,
    DEPRESSIONQUESTIONS,
} from "@/constants/questions";

// components
import PrimaryButton from "@/shared/components/PrimaryButton";

// assets
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

export default function SelectDiagnosisFragment() {
    const [t] = useTranslation();

    const { currentDiagnosis, selectDiagnosis, setSurvey, surveyState } =
        useDiagnosisStore();

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
                onClick={() => {
                    if (surveyState.status !== "onProgress") {
                        // 상태 확인 후 설문 시작
                        let questions = DEPRESSIONQUESTIONS;
                        let options = DEPRESSIONOPTIONS;
                        if (currentDiagnosis === "dementia") {
                            questions = DEMENTIAQUESTIONS;
                            options = DEMENTIAOPTIONS;
                        }
                        setSurvey(questions, options);
                    }
                }}
            />
        </div>
    );
}
