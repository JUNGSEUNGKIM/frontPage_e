import { useTranslation } from "react-i18next";
import { RPPGMeasurement, RPPGType } from "@/types";
import { CustomImage } from "./CustomImage";

import hrImage from "@/assets/hr.png";
import hrvImage from "@/assets/hrv.png";
import stressImage from "@/assets/stress.png";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    const [t] = useTranslation();
    return (
        <div className="w-full h-28 flex flex-row gap-4 px-8 ">
            <RppgMeasurementCell
                label={t("rppgEmotionLabel")}
                value={measurementValue.emotion}
                rppgType="Emotion"
            />
            <RppgMeasurementCell
                label={t("rppgHRLabel")}
                value={measurementValue.hr}
                rppgType="HR"
            />
            <RppgMeasurementCell
                label={t("rppgHRVLabel")}
                value={measurementValue.hrv}
                rppgType="HRV"
            />
            <RppgMeasurementCell
                label={t("rppgStressLabel")}
                value={measurementValue.stress}
                rppgType="Stress"
            />
        </div>
    );
}

interface RppgMeasurementCellProps {
    label: string;
    value: string;
    rppgType: RPPGType;
}

function RppgMeasurementCell({
    label,
    value,
    rppgType,
}: RppgMeasurementCellProps) {
    const isValueLoading = (value: string): boolean => {
        return value.length === 0 || value.includes("-");
    };

    return (
        <div className=" w-full h-full flex flex-col items-center justify-center bg-white rounded-lg py-4">
            {/* rPPG Label */}
            <h1 className="text-xl text-black/70 font-medium">{label}</h1>

            <div className="w-full h-20 flex flex-row items-center justify-center">
                {rppgType === "HR" && <CustomImage src={hrImage} alt="HR" />}
                {rppgType === "HRV" && <CustomImage src={hrvImage} alt="HR" />}
                {rppgType === "Stress" && (
                    <CustomImage src={stressImage} alt="HR" />
                )}
                <div className="w-28 h-full flex flex-row justify-center items-center  gap-2">
                    <h1 className="text-3xl font-bold text-black">{value}</h1>
                    {/* unit text */}
                    {!isValueLoading(value) && (
                        <RPPGUnitText rppgType={rppgType} />
                    )}
                </div>
            </div>
        </div>
    );
}
function RPPGUnitText({ rppgType }: { rppgType: RPPGType }) {
    function getRppgUnit(rppgType: RPPGType): string {
        switch (rppgType) {
            case "Emotion":
                return "";
            case "HR":
                return "bpm";
            case "HRV":
                return "ms";
            case "Stress":
                return "%";
        }
    }
    return <span>{getRppgUnit(rppgType)}</span>;
}
