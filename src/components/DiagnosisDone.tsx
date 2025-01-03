import { Text, Image, VStack, Spacer } from "@chakra-ui/react";
import { Button } from "./ui/button";
import RocketEmoji from "@/assets/animations/rocket.png";
import LoadingEmoji from "@/assets/animations/loading.png";
import palettes from "@/constants/colors";
import { RPPGMeasurement } from "@/types";
import { Link } from "react-router";

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
            width="90vw"
            height="30vh"
            p="24px"
            marginTop="4"
            borderRadius={12}
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
            {isDone && (
                <Link to="/report">
                    <Button
                        w="40vw"
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
                </Link>
            )}
            {!isDone && (
                <Button
                    w="40vw"
                    h="3vh"
                    mt="2vh"
                    bg={palettes.primary}
                    color="white"
                    fontWeight="medium"
                    fontSize="2xl"
                    loading={true}
                >
                    {`Let’s check!`}
                </Button>
            )}
            <Spacer />
        </VStack>
    );
}
