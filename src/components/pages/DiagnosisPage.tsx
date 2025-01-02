import { useState } from "react";
import palettes from "@/constants/colors";
import {
    Image,
    VStack,
    Text,
    Grid,
    GridItem,
    Center,
    HStack,
    Container,
    Spacer,
    Group,
} from "@chakra-ui/react";
import { AnswerButton } from "@/components/AnswerButton";
import { Button } from "@/components/ui/button";
import { RppgMeasurementList } from "@/components/RppgResults";
// import Webcam from "react-webcam";
import FaceDetectionApp from "@/components/FaceDetectionApp15";
import { RPPGMeasurement } from "@/types/rppg_types";
import { useSurvey } from "@/hooks/useSurvey";
import {
    DEMENTIAOPTIONS,
    DEMENTIAQUESTIONS,
    DEPRESSIONOPTIONS,
    DEPRESSIONQUESTIONS,
} from "@/constants/questions";

import { useNavigate } from "react-router";

import Logo from "@/assets/logo.png";
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { DiagnosisDone } from "../DiagnosisDone";
import { ChatFragment } from "../ChatFragment";
import { DtxFragment } from "../DtxFragment";

type Tap = "chat" | "diagnosis" | "dtx";

type DiagnosisType = "Depression" | "Dementia";

export function DiagnosisPage() {
    const navigate = useNavigate();
    // current tap
    const [currentTap, setCurrentTap] = useState<Tap>("diagnosis");

    const [selectedDiagnosis, setSelectedDiagnosis] =
        useState<DiagnosisType>("Depression");

    // button clicked check
    // const [isProcessing, setIsProcessing] = useState(false);

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
        if (newValue.emotion === "") {
            setMeasurement({ ...newValue, emotion: "None" });
        } else {
            setMeasurement(newValue);
        }
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

    function handleGoPreviousPage() {
        navigate(-1);
    }

    return (
        <VStack w="100vw" h="100vh" bg={palettes.background}>
            <HStack w="100vw">
                <Image
                    src={Logo}
                    h="2vh"
                    mt="2vw"
                    ml="2vw"
                    onClick={() => handleGoPreviousPage()}
                />
                <Spacer />
                <Group pt={5} pr={5}>
                    <Button
                        w="10vw"
                        bg={
                            currentTap === "diagnosis"
                                ? palettes.primary
                                : "white"
                        }
                        borderWidth="1px"
                        borderColor={
                            currentTap === "diagnosis"
                                ? palettes.primary
                                : palettes.grey
                        }
                        borderRadius={12}
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
                        w="10vw"
                        bg={currentTap === "dtx" ? palettes.primary : "white"}
                        borderWidth="1px"
                        borderColor={
                            currentTap === "dtx"
                                ? palettes.primary
                                : palettes.grey
                        }
                        borderRadius={12}
                        onClick={() => handleTap("dtx")}
                    >
                        <Text color={currentTap === "dtx" ? "white" : "black"}>
                            DTx
                        </Text>
                    </Button>
                    <Button
                        w="10vw"
                        bg={currentTap === "chat" ? palettes.primary : "white"}
                        borderWidth="1px"
                        borderColor={
                            currentTap === "chat"
                                ? palettes.primary
                                : palettes.grey
                        }
                        borderRadius={12}
                        onClick={() => handleTap("chat")}
                    >
                        <Text color={currentTap === "chat" ? "white" : "black"}>
                            AI Chat
                        </Text>
                    </Button>
                </Group>
            </HStack>
            <Grid templateRows="28% 60% 6%" minHeight="95vh" pt="10px" gap="5">
                <GridItem rounded="md">
                    <Center w="100%" h="100%">
                        <HStack w="100%" mb={1}>
                            <FaceDetectionApp
                                onValueChanged={handleMeasurement}
                            />
                        </HStack>
                    </Center>
                </GridItem>

                <GridItem rounded="md">
                    <Container h="100%">
                        <RppgMeasurementList measurementValue={measurement} />
                        {currentTap === "diagnosis" && (
                            <>
                                {state.status === "init" && (
                                    <VStack gap={4}>
                                        <Text
                                            color="black"
                                            fontSize="5xl"
                                            fontWeight="bold"
                                            animation="pulse"
                                            mt="3"
                                        >
                                            Choose Diagnosis Type
                                        </Text>
                                        <HStack w="100%">
                                            <Button
                                                w="49%"
                                                h="30vh"
                                                bg={"white"}
                                                borderColor={
                                                    selectedDiagnosis ===
                                                    "Depression"
                                                        ? palettes.primary
                                                        : palettes.grey
                                                }
                                                borderWidth={2}
                                                borderRadius={12}
                                                onClick={() => {
                                                    if (
                                                        selectedDiagnosis !==
                                                        "Depression"
                                                    ) {
                                                        setSelectedDiagnosis(
                                                            "Depression"
                                                        );
                                                    }
                                                }}
                                            >
                                                <VStack h="100%">
                                                    <Spacer />
                                                    <Text
                                                        color="black"
                                                        fontSize="2xl"
                                                        fontWeight="bold"
                                                    >
                                                        Depression Diagnosis
                                                        (PHQ-9)
                                                    </Text>
                                                    <Image
                                                        src={Crying}
                                                        h="8vh"
                                                        mt="3vh"
                                                        mb="1vh"
                                                    />
                                                    <Text
                                                        color="black"
                                                        textAlign="center"
                                                        whiteSpace="pre-line"
                                                        fontSize="xl"
                                                    >
                                                        The PHQ-9 (Patient
                                                        Health Questionnaire-9)
                                                        is a clinically
                                                        validated tool used to
                                                        screen, diagnose, and
                                                        measure the severity of
                                                        depression.
                                                    </Text>
                                                    <Spacer />
                                                </VStack>
                                            </Button>
                                            <Spacer />
                                            <Button
                                                w="49%"
                                                h="30vh"
                                                bg={"white"}
                                                borderColor={
                                                    selectedDiagnosis ===
                                                    "Dementia"
                                                        ? palettes.primary
                                                        : palettes.grey
                                                }
                                                borderWidth={2}
                                                borderRadius={12}
                                                onClick={() => {
                                                    if (
                                                        selectedDiagnosis !==
                                                        "Dementia"
                                                    ) {
                                                        setSelectedDiagnosis(
                                                            "Dementia"
                                                        );
                                                    }
                                                }}
                                            >
                                                <VStack h="100%">
                                                    <Spacer />
                                                    <Text
                                                        color={"black"}
                                                        fontSize="2xl"
                                                        fontWeight="bold"
                                                    >
                                                        Dementia Diagnosis
                                                    </Text>
                                                    <Image
                                                        src={Thinking}
                                                        h="8vh"
                                                        mt="3vh"
                                                        mb="1vh"
                                                    />
                                                    <Text
                                                        color={"black"}
                                                        textAlign="center"
                                                        whiteSpace="pre-line"
                                                        fontSize="xl"
                                                    >
                                                        Dementia diagnosis
                                                        involves a comprehensive
                                                        evaluation to determine
                                                        the presence and
                                                        severity of cognitive
                                                        decline that interferes
                                                        with daily life.
                                                    </Text>
                                                    <Spacer />
                                                </VStack>
                                            </Button>
                                        </HStack>
                                        <Button
                                            w="100%"
                                            h="4vh"
                                            mt={3}
                                            bg={palettes.primary}
                                            fontSize="3xl"
                                            color="white"
                                            borderRadius={12}
                                            onClick={() => {
                                                let questions =
                                                    DEPRESSIONQUESTIONS;
                                                let options = DEPRESSIONOPTIONS;
                                                if (
                                                    selectedDiagnosis ===
                                                    "Dementia"
                                                ) {
                                                    questions =
                                                        DEMENTIAQUESTIONS;
                                                    options = DEMENTIAOPTIONS;
                                                }
                                                startSurvey(questions, options);
                                            }}
                                        >
                                            Start Diagnosis
                                        </Button>
                                    </VStack>
                                )}
                                {state.status === "onProgress" && (
                                    <>
                                        <Center
                                            bg="white"
                                            borderWidth={2}
                                            borderColor={palettes.grey}
                                            borderRadius={12}
                                            width="100%"
                                            height="13vh"
                                            p="24px"
                                        >
                                            <VStack
                                                h="100%"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <Spacer />
                                                <Text
                                                    h="50%"
                                                    fontSize="4xl"
                                                    fontWeight="bold"
                                                    color="black"
                                                    textAlign="center"
                                                >
                                                    {
                                                        state.surveyQuestions
                                                            .questions[
                                                            state.currentIndex
                                                        ]
                                                    }
                                                </Text>
                                                <Spacer />
                                                <Text color="black">{`${
                                                    state.currentIndex + 1
                                                } / ${
                                                    state.surveyQuestions
                                                        .questions.length
                                                }`}</Text>
                                                <Spacer />
                                            </VStack>
                                        </Center>
                                        {state.surveyQuestions.options.map(
                                            (_, idx) => (
                                                <AnswerButton
                                                    key={idx}
                                                    label={
                                                        state.surveyQuestions
                                                            .options[idx]
                                                    }
                                                    isSelected={
                                                        tappedButtonIdx === idx
                                                    }
                                                    handleTap={() =>
                                                        handleAnswerTap(idx)
                                                    }
                                                />
                                            )
                                        )}
                                        <HStack mt="5vh" mb="1vh" gap={0}>
                                            <Button
                                                w="30%"
                                                h="3vh"
                                                color="white"
                                                fontSize="l"
                                                fontWeight="bold"
                                                bg={palettes.primary}
                                                borderColor={palettes.primary}
                                                borderWidth={2}
                                                borderRadius={12}
                                                onClick={() => {
                                                    goBack();
                                                }}
                                            >
                                                Prev
                                            </Button>
                                            <Container width="1vw" />
                                            <Button
                                                w="30%"
                                                h="3vh"
                                                bg="white"
                                                fontWeight="bold"
                                                borderColor={palettes.grey}
                                                borderWidth={2}
                                                borderRadius={12}
                                                color="black"
                                                fontSize="l"
                                                onClick={handleGoPreviousPage}
                                            >
                                                Stop
                                            </Button>
                                        </HStack>
                                    </>
                                )}
                                {state.status === "done" && (
                                    <DiagnosisDone
                                        rppgMesurement={measurement}
                                    />
                                )}
                            </>
                        )}
                        {/* Add Chat fragment here */}
                        {currentTap === "chat" && <ChatFragment />}
                        {currentTap === "dtx" && <DtxFragment />}
                    </Container>
                </GridItem>
            </Grid>
        </VStack>
    );
}

// Button error -> Chakra snippet 버튼에만 loading이 기본적으로 구현되어있다.
