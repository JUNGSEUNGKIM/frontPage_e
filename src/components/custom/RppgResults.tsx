import { HStack, VStack, Center, Text } from "@chakra-ui/react";
import palettes from "@/constants/colors";
import { RppgItem } from "./RppgItem";
import { RPPGMeasurement } from "@/types";
import { useTranslation } from "react-i18next";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    const [t] = useTranslation();

    return (
        <HStack gap="1px" w="100%" h="10%">
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
        </HStack>
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
        <Center
            w="25%"
            h="100%"
            bg="white"
            borderRadius={12}
            borderWidth="2px"
            borderColor={palettes.grey}
        >
            <VStack>
                <Text
                    textStyle="2xl"
                    color="blackAlpha.700"
                    fontWeight="medium"
                >
                    {label}
                </Text>
                <RppgItem
                    isEmotion={label === "Emotion"}
                    value={value}
                    label={label}
                />
            </VStack>
        </Center>
    );
}
