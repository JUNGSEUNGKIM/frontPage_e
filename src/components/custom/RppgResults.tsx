import { RppgItem } from "./RppgItem";
import { RPPGMeasurement } from "@/types";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    return (
        <div className="w-full h-[15%] flex flex-row gap-4 px-8 h-28">
            <RppgMeasurementCell
                label="Emotion"
                value={measurementValue.emotion}
            />
            <RppgMeasurementCell label="HR" value={measurementValue.hr} />
            <RppgMeasurementCell label="HRV" value={measurementValue.hrv} />
            <RppgMeasurementCell
                label="Stress"
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
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center bg-white rounded-lg py-4">
            <h1 className="text-2xl text-black/70 font-medium">{label}</h1>
            <RppgItem
                isEmotion={label === "Emotion"}
                value={value}
                label={label}
            />
        </div>
    );
}
