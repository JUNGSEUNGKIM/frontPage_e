import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";
import { DiagnosisReport } from "@/types";
import HeartBeat from "@/assets/heartbeat2.png";

interface HRVProps {
    state: DiagnosisReport
}

export default function HRV({state}: HRVProps) {

    const [t] = useTranslation();

    return (
        <StatCard title={t("HRV")}>
            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center justify-center mb-4 px-10">
                    <img src={HeartBeat} className="w-1/2" />
                    <span className="w-1/2 text-8xl font-bold text-blue-500 text-center">
                        {state.measurement.hrv}
                    </span>
                </div>
                <span className="text-sm text-slate-400 text-center">
                    {t("hrvDescription")}
                </span>
            </div>
        </StatCard>
    );
}