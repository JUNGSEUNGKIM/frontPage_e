import { DiagnosisReport } from "@/types";
import { ResultChardCard } from "./ResultChartCard";
import { Label, PieChart, Pie } from "recharts";
import { ChartConfig } from "../types/ChartConfig";
import { DiagnosisResultStatus } from "../types/index";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import isLandScape from "@/utls/is_landscape";

interface SummaryCardProps {
    state: DiagnosisReport;
}

const chartConfig = {
    scores: {
        label: "scores",
    },
    left: {
        label: "left",
        color: "hsl(var(--chart-1))",
    },
    get: {
        label: "get",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function SummaryCard({ state }: SummaryCardProps) {
    const [t] = useTranslation();

    const score = state.score;

    // Sample data for the HR chart
    // left : total score - get
    // get : scores. sum
    const maxScore =
        state.diagnosisType === "dementia"
            ? 30
            : state.diagnosisType === "depressionCESD"
            ? 60
            : state.diagnosisType === "depressionGDS"
            ? 30
            : 100;

    const chartData = [
        { browser: "left", scores: maxScore - state.score, fill: "#e2e8f0" },
        { browser: "get", scores: state.score, fill: "#3b82f6" },
    ];

    // Diagnosis Status
    // 기준 점수와 설명 정의
    const thresholds: Record<
        string,
        {
            normal: { score: number; description: string };
            warning: { score: number; description: string };
            danger: { score: number; description: string };
            severe?: { score: number; description: string };
        }
    > = {
        depressionCESD: {
            normal: {
                score: 15,
                description: t("depressionNormalDescription"),
            },
            warning: {
                score: 20,
                description: t("depressionWarningDescription"),
            },
            danger: {
                score: 24,
                description: t("depressionWarningDescription"),
            },
            severe: {
                score: Infinity,
                description: t("depressionSevereDescription"),
            },
        },
        depressionGDS: {
            normal: {
                score: 10,
                description: t("depressionNormalDescription"),
            },
            warning: {
                score: 20,
                description: t("depressionWarningDescription"),
            },
            danger: {
                score: Infinity,
                description: t("depressionDangerDescription"),
            },
        },
        dementia: {
            normal: {
                score: 5,
                description: t("dementiaNormalDescription"),
            },
            warning: {
                score: 20,
                description: t("dementiaWarningDescription"),
            },
            danger: {
                score: Infinity,
                description: t("dementiaDangerDescription"),
            },
        },
    };

    // Diagnosis Status 결정 함수
    function getDiagnosisResult(
        type: string,
        score: number
    ): { status: DiagnosisResultStatus; description: string } {
        const threshold = thresholds[type];
        if (!threshold) {
            throw new Error(`Unknown diagnosis type: ${type}`);
        }

        if (score < threshold.normal.score) {
            return {
                status: "Normal",
                description: threshold.normal.description,
            };
        } else if (score < threshold.warning.score) {
            return {
                status: "Warning",
                description: threshold.warning.description,
            };
        } else if (score < threshold.danger.score) {
            return {
                status: "Danger",
                description: threshold.warning.description,
            };
        } else if (threshold.severe && score < threshold.severe.score) {
            return {
                status: "Severe",
                description: threshold.warning.description,
            };
        } else {
            return {
                status: "Unknown",
                description: threshold.warning.description,
            };
        }
    }

    // 사용 예
    const diagnosisType = state.diagnosisType; // e.g., "depressionCESD"
    const { status: diagnosisStatus, description: diagnosisDescription } =
        getDiagnosisResult(diagnosisType!, score);

    const horizontal = "flex flex-col justify-between items-center p-4";
    const vertical = "flex flex-row justify-between items-center p-4";

    return (
        <div className="w-full flex flex-col bg-blue-50 rounded-2xl">
            <div className={clsx(isLandScape() ? horizontal : vertical)}>
                <div className="flex flex-col w-[20rem] h-full">
                    <ResultChardCard
                        config={chartConfig}
                        className="aspect-square w-auto"
                    >
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="scores"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            "cx" in viewBox &&
                                            "cy" in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-2xl font-bold"
                                                    >
                                                        {`${score}`}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        Score
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResultChardCard>
                </div>
                <div className="flex flex-col w-1/2">
                    <h3 className="font-bold text-xl">
                        {state.diagnosisType === "dementia"
                            ? t("dementiaResultLabel")
                            : t("depressionResultLabel")}
                    </h3>
                    <div className="flex flex-row gap-4 bg-white px-2 rounded-md my-2">
                        <h4 className="font-bold">{t("statusLabel")}</h4>
                        <h4
                            className={`font-bold ${
                                diagnosisStatus === "Normal"
                                    ? "text-blue-500"
                                    : diagnosisStatus === "Warning"
                                    ? "text-orange-500"
                                    : "text-red-500"
                            }`}
                        >
                            {diagnosisStatus === "Danger"
                                ? t("statusDangerLabel")
                                : diagnosisStatus === "Normal"
                                ? t("statusNormalLabel")
                                : diagnosisStatus === "Warning"
                                ? t("statusWarningLabel")
                                : diagnosisStatus === "Severe"
                                ? t("statusSevereLabel")
                                : "Unknown"}
                        </h4>
                    </div>
                    <p>{diagnosisDescription}</p>
                </div>
            </div>
        </div>
    );
}
