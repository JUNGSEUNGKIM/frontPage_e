import { Text, Image, VStack, Spacer } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import RocketEmoji from "@/assets/animations/rocket.png";
import LoadingEmoji from "@/assets/animations/loading.png";
import palettes from "@/constants/colors";
import { DiagnosisType, RPPGMeasurement } from "@/types";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// TODO: remove chakra ui

export default function DiagnosisDoneFragment({
    rppgMesurement,
    hrValues,
    selectedDiagnosisType,
    answers,
}: {
    rppgMesurement: RPPGMeasurement;
    hrValues: string[];
    selectedDiagnosisType: DiagnosisType;
    answers: number[];
}) {
    const [t] = useTranslation();

    const navigate = useNavigate();

    const isDone =
        rppgMesurement.hrv !== "0" &&
        rppgMesurement.hr !== "0" &&
        rppgMesurement.stress !== "0" &&
        hrValues.length > 5;

    function handleClick() {
        navigate("/report", {
            state: {
                measurement: rppgMesurement,
                hrValues: hrValues,
                score: answers.reduce((acc, current) => acc + current, 0),
                diagnosisType: selectedDiagnosisType,
            },
        });
    }

    return (
        <VStack
            bg="white"
            width="94vw"
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
                {isDone ? t("doneLabel") : t("waitingLabel")}
            </Text>
            {isDone && (
                <Button
                    w="40vw"
                    h="3vh"
                    mt="2vh"
                    bg={palettes.primary}
                    color="white"
                    fontWeight="medium"
                    fontSize="2xl"
                    loading={!isDone}
                    onClick={handleClick}
                    className="shadow-md"
                >
                    {t("btnLetsCheck")}
                </Button>
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
                    className="shadow-md"
                >
                    {t("btnLetsCheck")}
                </Button>
            )}
            <Spacer />
        </VStack>
    );
}
