import { HStack, Text } from "@chakra-ui/react";
import { CustomImage } from "./CustomImage";
import hrImage from "@/assets/hr.png";
import hrvImage from "@/assets/hrv.png";
import stressImage from "@/assets/stress.png";

export function RppgItem({
    value,
    isEmotion,
    label,
}: {
    value: string;
    isEmotion: boolean;
    label: string;
}) {
    if (isEmotion) {
        return (
            <Text textStyle="3xl" fontWeight="bold" color="black">
                {value}
            </Text>
        );
    }
    return (
        <HStack>
            {label === "HR" && <CustomImage src={hrImage} alt="HR" />}
            {label === "HRV" && <CustomImage src={hrvImage} alt="HRV" />}
            {label === "Stress" && (
                <CustomImage src={stressImage} alt="Stress" />
            )}
            <Text textStyle="3xl" fontWeight="bold" color="black">
                {value}
            </Text>
        </HStack>
    );
}
