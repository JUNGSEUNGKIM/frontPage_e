import { Area, AreaChart } from "recharts";
import { ChartContainer, StatCard } from "../components/index";
import { DiagnosisReport } from "@/types";
import { useTranslation } from "react-i18next";

interface HRProps {
    state: DiagnosisReport
}

export default function HR({state}: HRProps) {

    const [t] = useTranslation();

    const hrData = state.hrValues.map((e: string, i: number) => {
        return { time: `${i}`, value: Number(e) };
    });
    const convertedHrValues = state.hrValues.map((e) => Number(e));
    const hrValuesMin = Math.min(...convertedHrValues);
    const hrValuesMax = Math.max(...convertedHrValues);
    const hrValuesMean = Math.floor(
        convertedHrValues.reduce(
            (ac: number, current: number) => ac + current,
            0
        ) / state.hrValues.length
    );
    
    return (
        <StatCard title={t("HR")}>
            <ChartContainer
                config={{
                    value: {
                        label: "Heart Rate",
                        color: "#3b82f6",
                    },
                }}
                className="w-full h-[200px]"
            >
                <AreaChart data={hrData}>
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
            </ChartContainer>
            <div className="mt-2 flex justify-start gap-2 text-sm text-muted-foreground">
                <span>Min: {hrValuesMin}</span>
                <span>Max: {hrValuesMax}</span>
                <span>Mean: {hrValuesMean}</span>
            </div>
        </StatCard>
    );
}