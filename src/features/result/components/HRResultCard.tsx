import { Area, AreaChart, YAxis } from "recharts";
import { ResultChardCard } from "./index";
import { DiagnosisResult } from "../types";
import { useTranslation } from "react-i18next";
import HRIcon from "@/assets/hr.png";

interface HRResultCardProps {
    state: DiagnosisResult;
    isLandscape: boolean;
}

export default function HRResultCard({
    state,
    isLandscape,
}: HRResultCardProps) {
    const [t] = useTranslation();

    const hrData = state.hrValues.map((e: string, i: number) => {
        return { time: `${i}`, value: Number(e) };
    });

    const convertedHrValues = state.hrValues
        .filter((e) => e != "-" && e != "--" && e != "0")
        .map((e) => Number(e))
        .filter((e) => e != 0);
    console.log(convertedHrValues);
    const hrValuesMin = Math.min(...convertedHrValues);
    const hrValuesMax = Math.max(...convertedHrValues);
    const hrValuesMean = Math.floor(
        convertedHrValues.reduce(
            (ac: number, current: number) => ac + current,
            0
        ) / state.hrValues.length
    );

    return isLandscape ? (
        <div className="w-[25rem] h-full flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
            <h3 className="font-bold mb-4">{t("rppgHRLabel")} </h3>
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-1/2 flex flex-col items-center justify-center p-4">
                    <div className="flex flex-row items-center justify-center mb-4 px-10 gap-4">
                        <img src={HRIcon} className="w-20" />
                        <span className="w-1/2 text-7xl font-bold text-blue-600 text-center">
                            {hrValuesMean}
                        </span>
                        <span className="text-4xl font-bold text-blue-600">
                            bpm
                        </span>
                    </div>
                    <span className="text-sm text-slate-400 text-center">
                        Heart Rate(심박수)는 1분 동안 심장이 뛰는 횟수(BPM)로,
                        일반적으로 성인은 60~100 BPM이 정상 범위에요. 심박수가
                        너무 높거나 낮으면 <br /> 스트레스, 피로, 건강 문제의
                        신호일 수 있어 주의가 필요해요.
                    </span>
                </div>

                <div className="w-full h-1/2 flex flex-col items-center justify-center">
                    <ResultChardCard
                        config={{
                            value: {
                                label: "Heart Rate",
                                color: "#3b82f6",
                            },
                        }}
                        className="h-52"
                    >
                        <AreaChart data={hrData}>
                            <YAxis />
                            <defs>
                                <linearGradient
                                    id="hrGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-value)"
                                fill="url(#hrGradient)"
                            />
                        </AreaChart>
                    </ResultChardCard>
                    <div className="mt-2 flex flex-row justify-center items-start gap-10 text-lg text-bold text-slate-400">
                        <h1>Min: {hrValuesMin} bpm</h1>
                        <h1>Max: {hrValuesMax} bpm</h1>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full h-[22rem] flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
            <h3 className="font-bold mb-4">{t("rppgHRLabel")} </h3>
            <div className="w-full h-full flex flex-row">
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
                    <div className="flex flex-row items-center justify-center mb-4 px-10 gap-4">
                        <img src={HRIcon} className="w-20" />
                        <span className="w-1/2 text-8xl font-bold text-blue-600 text-center">
                            {hrValuesMean}
                        </span>
                        <span className="text-4xl font-bold text-blue-600">
                            bpm
                        </span>
                    </div>
                    <span className="text-sm text-slate-400 text-center">
                        Heart Rate(심박수)는 1분 동안 심장이 뛰는 횟수(BPM)로,
                        일반적으로 성인은 60~100 BPM이 정상 범위에요. 심박수가
                        너무 높거나 낮으면 <br /> 스트레스, 피로, 건강 문제의
                        신호일 수 있어 주의가 필요해요.
                    </span>
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center">
                    <ResultChardCard
                        config={{
                            value: {
                                label: "Heart Rate",
                                color: "#3b82f6",
                            },
                        }}
                        className="h-52"
                    >
                        <AreaChart data={hrData}>
                            <YAxis />
                            <defs>
                                <linearGradient
                                    id="hrGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-value)"
                                fill="url(#hrGradient)"
                            />
                        </AreaChart>
                    </ResultChardCard>
                    <div className="mt-2 flex flex-row justify-center items-start gap-10 text-lg text-bold text-slate-400">
                        <h1>Min: {hrValuesMin} bpm</h1>
                        <h1>Max: {hrValuesMax} bpm</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
