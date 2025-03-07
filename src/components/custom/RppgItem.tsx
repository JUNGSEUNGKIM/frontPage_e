import { HStack, Text } from "@chakra-ui/react";
import { CustomImage } from "./CustomImage";
import hrImage from "@/assets/hr.png";
import hrvImage from "@/assets/hrv.png";
import stress from "@/assets/stress.png";

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

    const isValueLoading = (value: string): boolean => {
        return value.length === 0 || value.indexOf('-') > -1
    }

    return (
        <HStack className="w-full flex justify-center">
            {label === "HR" || label === "심박수" && <CustomImage src={hrImage} alt="HR" />}
            {label === "HRV" || label === "심박 변이도" && <CustomImage src={hrvImage} alt="HRV" />}
            {label === "Stress" || label === "스트레스" && <CustomImage src={stress} alt="Stress" />}
            <div className="w-1/2 flex items-end">
                <h1 className="text-3xl font-bold font-black">{value}</h1>
                <p className="pl-2">
                    {
                        isValueLoading(value) ? "" :
                        label === "HR" || label === "심박수" ? "bpm" :
                        label === "HRV" || label === "심박 변이도" ? "ms" :
                        ""
                    }
                </p>
            </div>
        </HStack>
    );
}
