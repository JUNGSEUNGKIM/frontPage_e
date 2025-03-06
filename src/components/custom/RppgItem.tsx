import { HStack, Text } from "@chakra-ui/react";
import { CustomImage } from "./CustomImage";
import hrImage from "@/assets/hr.png";
import hrvImage from "@/assets/hrv.png";
import stress from "@/assets/stress.png";
import { useTranslation } from "react-i18next";

export function RppgItem({
    value,
    isEmotion,
    label,
}: {
    value: string;
    isEmotion: boolean;
    label: string;
}) {
    const [t] = useTranslation();

    if (isEmotion) {
        return (
            <Text textStyle="3xl" fontWeight="bold" color="black">
                {value}
            </Text>
        );
    }

    const isValueLoading = (value: string): boolean => {
        return value.length === 0 || value.indexOf('-') > -1
    }

    return (
        <HStack className="w-full flex justify-center">
            {label === "HR" && <CustomImage src={hrImage} alt="HR" />}
            {label === "HRV" && <CustomImage src={hrvImage} alt="HRV" />}
            {label === "Stress" && <CustomImage src={stress} alt="Stress" />}
            <div className="w-1/2 flex items-end">
                <h1 className="text-3xl font-bold font-black">{value}</h1>
                <p className="pl-2">
                    {
                        isValueLoading(value) ? "" :
                        label === "HR" ? "bpm" :
                        label === "HRV" ? "ms" :
                        ""
                    }
                </p>
            </div>
        </HStack>
    );
}
