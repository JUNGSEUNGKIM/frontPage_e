import { DiagnosisResult } from "../types";
import { useTranslation } from "react-i18next";
import StatCard from "./StatCard";

interface LSEmotionResultCardProps {
    state: DiagnosisResult;
}

export default function LSEmotionResultCard({
    state,
}: LSEmotionResultCardProps) {
    const [t] = useTranslation();

    const emotions = [
        {
            label: t("emotionAngryLabel"),
            emoji: "😡",
            color: "#FF0000",
            value: Number(state.measurement.emotionResult.Angry), // 값 참조
        },
        {
            label: t("emotionDisgustedLabel"),
            emoji: "😫",
            color: "#8B0000",
            value: Number(state.measurement.emotionResult.Disgusted),
        },
        {
            label: t("emotionFearfulLabel"),
            emoji: "😨",
            color: "#800080", // 보라색
            value: Number(state.measurement.emotionResult.Fearful),
        },
        {
            label: t("emotionHappyLabel"),
            emoji: "😄",
            color: "#facc15", // 노란색
            value: Number(state.measurement.emotionResult.Happy),
        },
        {
            label: t("emotionNeutralLabel"),
            emoji: "🙂",
            color: "#808080", // 회색
            value: Number(state.measurement.emotionResult.Neutral),
        },
        {
            label: t("emotionSadLabel"),
            emoji: "😢",
            color: "#0000FF", // 파란색
            value: Number(state.measurement.emotionResult.Sad),
        },
        {
            label: t("emotionSurprisedLabel"),
            emoji: "😮",
            color: "#f97316", // 주황색
            value: Number(state.measurement.emotionResult.Surprised),
        },
    ];

    return (
        <StatCard title={t("rppgEmotionLabel")}>
            <div className="w-full space-y-2 flex flex-col">
                {emotions.map((emotion, index) => (
                    <div
                        key={index}
                        className="w-full flex flex-row items-center gap-2"
                    >
                        {/* text with emoji */}
                        <div className="flex justify-between w-24">
                            <span className="font-bold">{emotion.label}</span>
                            <span className="text-xl">{emotion.emoji}</span>
                        </div>
                        <div className="w-full">
                            <div
                                className="h-8 rounded-md "
                                style={{
                                    width:
                                        emotion.value <= 0.08
                                            ? "1%"
                                            : `${Math.round(
                                                  emotion.value * 100
                                              )}%`,
                                    backgroundColor: emotion.color,
                                }}
                            >
                                <div className="flex justify-end items-center h-full pr-1 text-white text-xs font-bold">
                                    {emotion.value <= 0.08
                                        ? ""
                                        : `${Math.round(emotion.value * 100)}%`}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </StatCard>
    );
}
