import { DiagnosisResult } from "../types";
import StatCard from "./StatCard";
import { useTranslation } from "react-i18next";

interface LSStressResultCardProps {
    state: DiagnosisResult;
}

export default function LSStressResultCard({ state }: LSStressResultCardProps) {
    const [t] = useTranslation();

    const stressText =
        Number(state.measurement.stress) <= 60
            ? t("lowStressDescription")
            : t("highStressDescription");

    return (
        <StatCard
            title={t("rppgStressLabel")}
            // className="w-[23vw] h-full flex flex-col"
        >
            <div className="relative mt-12">
                <div
                    className="absolute -top-3 transform -translate-x-1/2 text-blue-500"
                    style={{
                        left: `${state.measurement.stress}%`,
                    }} // Adjust this value based on the actual stress score
                >
                    ▼
                </div>
                {/* Bar */}
                <div className="flex justify-center items-center h-10 bg-gradient-to-r  from-blue-100 via-blue-300 to-blue-500 rounded-md">
                    <p className="text-2xl text-center font-bold text-white">
                        score : {state.measurement.stress}
                    </p>
                </div>
            </div>
            <p className="text-lg text-center mt-10">{stressText}</p>
        </StatCard>
    );
}
