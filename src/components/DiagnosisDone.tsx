import { Text, Image, VStack, Spacer } from "@chakra-ui/react";
import { Button } from "./ui/button";
import RocketEmoji from "@/assets/animations/rocket.png";
import LoadingEmoji from "@/assets/animations/loading.png";
import palettes from "@/constants/colors";
import { RPPGMeasurement } from "@/types";

const RESULT_TEXT = `Your assessment is complete!\nReady to check your results?`;
const WAITNG_TEXT = `Please Waiting...`;

export function DiagnosisDone({
    rppgMesurement,
}: {
    rppgMesurement: RPPGMeasurement;
}) {
    const isDone =
        rppgMesurement.hrv !== "0" &&
        rppgMesurement.hr !== "0" &&
        rppgMesurement.stress !== "0";

    return (
        <VStack
            bg="white"
            width="100%"
            height="30vh"
            p="24px"
            borderRadius={2}
            borderWidth={2}
            borderColor={palettes.grey}
        >
            <Spacer />
            <Image src={isDone ? RocketEmoji : LoadingEmoji} h="12vh" />
            <Text
                color="black"
                whiteSpace="pre-line"
                textAlign="center"
                fontSize="4xl"
                fontWeight="bold"
            >
                {isDone ? RESULT_TEXT : WAITNG_TEXT}
            </Text>
            <Button
                w="60%"
                h="3vh"
                mt="2vh"
                bg={palettes.primary}
                color="white"
                fontWeight="medium"
                fontSize="2xl"
                loading={!isDone}
            >
                {`Let’s check!`}
            </Button>
            <Spacer />
        </VStack>
    );
}
