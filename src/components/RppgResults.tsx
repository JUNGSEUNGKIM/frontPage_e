import { HStack, VStack, Center, Text } from "@chakra-ui/react";
import palettes from "@/constants/colors";
import { RppgItem } from "./RppgItem";
import { RPPGMeasurement } from "@/types";

export function RppgMeasurementList({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    return (
        <HStack gap="1px" w="100%" h="100%">
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
            p="10px"
            borderRadius="md"
            borderWidth="2px"
            borderColor={palettes.grey}
        >
            <Center w="100%" h="100%" bg="white">
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
        </Center>
    );
}
