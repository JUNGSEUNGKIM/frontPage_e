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
    return (
        <HStack>
            {label === t("rppgHRLabel") && (
                <CustomImage src={hrImage} alt="HR" />
            )}
            {label === t("rppgHRVLabel") && (
                <CustomImage src={hrvImage} alt="HRV" />
            )}
            {label === t("rppgStressLabel") && (
                <CustomImage src={stress} alt="Stress" />
            )}
            <h1 className="w-12 text-3xl font-bold text-black">{value}</h1>
        </HStack>
    );
}
