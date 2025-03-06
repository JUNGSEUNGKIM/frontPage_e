import { useTranslation } from "react-i18next";
import { RppgItem } from "./RppgItem";
import { RPPGMeasurement } from "@/types";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    const [t] = useTranslation();
    return (
        <div className="w-full h-[15%] flex flex-row gap-4 px-8 h-28">
            <RppgMeasurementCell
                label={t("rppgEmotionLabel")}
                value={measurementValue.emotion}
            />
            <RppgMeasurementCell
                label={t("rppgHRLabel")}
                value={measurementValue.hr}
            />
            <RppgMeasurementCell
                label={t("rppgHRVLabel")}
                value={measurementValue.hrv}
            />
            <RppgMeasurementCell
                label={t("rppgStressLabel")}
                value={measurementValue.stress}
            />
        </div>
    );
}

function RppgMeasurementCell({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    const [t] = useTranslation();
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center bg-white rounded-lg py-4">
            <h1 className="text-xl text-black/70 font-medium">{label}</h1>
            <RppgItem
                isEmotion={label === t("rppgEmotionLabel")}
                value={value}
                label={label}
            />
        </div>
    );
}
