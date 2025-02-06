import { RppgItem } from "./RppgItem";
import { RPPGMeasurement } from "@/types";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    return (
        <div className="w-full h-[10%] flex flex-row gap-2 px-4">
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
        // <HStack gap="1px" w="100%" h="10%">
        // </HStack>
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
