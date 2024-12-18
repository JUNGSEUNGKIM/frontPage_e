import { useEffect, useState } from "react";
import palettes, { bg, grey, primary } from "@/constants/colors";
import {
    Image,
    VStack,
    Text,
    Grid,
    GridItem,
    Center,
    Square,
    HStack,
    Container,
    Spacer,
} from "@chakra-ui/react";
import { AnswerButton } from "@/components/AnswerButton";
import { Button } from "@/components/ui/button";
import { RppgMeasurementList } from "@/components/RppgResults";
// import Webcam from "react-webcam";
import FaceDetectionApp from "@/components/FaceDetectionApp15";
import { RPPGMeasurement } from "@/types/rppg_types";
import { useSurvey } from "@/hooks/useSurvey";
import { DEPRESSIONOPTIONS, DEPRESSIONQUESTIONS } from "@/constants/questions";

type Tap = "chat" | "diagnosis" | "lucid";

export function DiagnosisPage() {
    // current tap
    const [currentTap, setCurrentTap] = useState<Tap>("diagnosis");

    // button clicked check
    const [isProcessing, setIsProcessing] = useState(false);

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    const { state, startSurvey, answerQuestion, goBack } = useSurvey();
    // status : init / progress / done

    const [measurement, setMeasurement] = useState<RPPGMeasurement>({
        hr: "0",
        hrv: "0",
        stress: "0",
        emotion: "None",
    });

    // handle rppg
    function handleMeasurement(newValue: RPPGMeasurement) {
        setMeasurement(newValue);
    }

    function handleTap(selectedTap: Tap) {
        setCurrentTap(selectedTap);
    }

    function handleAnswerTap(idx: number) {
        setTappedButtonIdx(idx);
        setTimeout(() => {
            setTappedButtonIdx(null);
            answerQuestion(idx);
        }, 1000);
    }

    return (
        <Container bg={bg}>
            <Center height="5vh" bg="white">
                <HStack w="100%" gap="10px">
                    <Image src="logo.png" h="2vh" alt="logo" />
                    <Spacer />
                    <Button
                        size="md"
                        w="100px"
                        bg={currentTap === "diagnosis" ? primary : "white"}
                        borderWidth="1px"
                        borderColor={
                            currentTap === "diagnosis" ? primary : grey
                        }
                        onClick={() => handleTap("diagnosis")}
                    >
                        <Text
                            color={
                                currentTap === "diagnosis" ? "white" : "black"
                            }
                        >
                            Diagnosis
                        </Text>
                    </Button>
                    <Button
                        size="md"
                        w="100px"
                        bg={currentTap === "lucid" ? primary : "white"}
                        borderWidth="1px"
                        borderColor={currentTap === "lucid" ? primary : grey}
                        onClick={() => handleTap("lucid")}
                    >
                        <Text
                            color={currentTap === "lucid" ? "white" : "black"}
                        >
                            Lucid
                        </Text>
                    </Button>
                    <Button
                        size="md"
                        w="100px"
                        bg={currentTap === "chat" ? primary : "white"}
                        borderWidth="1px"
                        borderColor={currentTap === "chat" ? primary : grey}
                        onClick={() => handleTap("chat")}
                    >
                        <Text color={currentTap === "chat" ? "white" : "black"}>
                            AI Chat
                        </Text>
                    </Button>
                </HStack>
            </Center>
            <Grid minHeight="95vh" pt="10px" gap="10px">
                <GridItem rowSpan={1} bg="gray.50" rounded="md">
                    <RppgMeasurementList measurementValue={measurement} />
                </GridItem>
                <GridItem rowSpan={2} rounded="md">
                    <Center w="100%" h="100%">
                        <HStack w="100%">
                            <FaceDetectionApp
                                onValueChanged={handleMeasurement}
                            />
                        </HStack>
                    </Center>
                </GridItem>

                <GridItem rowSpan={4} rounded="md">
                    {state.status === "init" && (
                        <Button
                            onClick={() =>
                                startSurvey(
                                    DEPRESSIONQUESTIONS,
                                    DEPRESSIONOPTIONS
                                )
                            }
                            bg={palettes.primary}
                            color="white"
                        >
                            Start diagnosis
                        </Button>
                    )}
                    {state.status === "onProgress" && (
                        <>
                            <Square
                                bg="white"
                                borderRadius="md"
                                borderWidth="1px"
                                borderColor="#C6C6C6"
                                width="100%"
                                height="20vh"
                                p="24px"
                            >
                                <VStack alignItems="center">
                                    <Text
                                        fontSize="4xl"
                                        fontWeight="bold"
                                        color="black"
                                    >
                                        {
                                            state.surveyQuestions.questions[
                                                state.currentIndex
                                            ]
                                        }
                                    </Text>
                                </VStack>
                            </Square>
                            {/* Array -> question answers */}
                            {/* Create question and answers object */}
                            {state.surveyQuestions.options.map((_, idx) => (
                                <AnswerButton
                                    key={idx}
                                    label={state.surveyQuestions.options[idx]}
                                    isSelected={tappedButtonIdx === idx}
                                    handleTap={() => handleAnswerTap(idx)}
                                />
                            ))}
                        </>
                    )}
                    {state.status === "done" && (
                        <Center>
                            <Text color="black">Result Component</Text>
                        </Center>
                    )}
                </GridItem>
            </Grid>
        </Container>
    );
}

// Button error -> Chakra snippet 버튼에만 loading이 기본적으로 구현되어있다.
