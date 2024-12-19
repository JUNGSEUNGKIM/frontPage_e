import { useState } from "react";
import palettes, { bg, grey, primary } from "@/constants/colors";
import { Link } from "react-router";
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

type Tap = "chat" | "diagnosis" | "lucid";

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

    function handleGoPreviousPage() {
        navigate(-1);
    }

    return (
        <Container bg={bg}>
            <Center height="5vh" bg="white">
                <HStack w="100%" gap="10px">
                    <Link to="/">
                        <Image src={Logo} h="2vh" alt="logo" />
                    </Link>
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
            <Grid
                templateRows="10% 30% 60%"
                minHeight="95vh"
                pt="10px"
                gap="10px"
            >
                <GridItem bg="gray.50" rounded="md">
                    <RppgMeasurementList measurementValue={measurement} />
                </GridItem>
                <GridItem rounded="md">
                    <Center w="100%" h="100%">
                        <HStack w="100%">
                            <FaceDetectionApp
                                onValueChanged={handleMeasurement}
                            />
                        </HStack>
                    </Center>
                </GridItem>

                <GridItem rounded="md">
                    <Container h="100%">
                        {state.status === "init" && (
                            <VStack gap="2vh">
                                <Text
                                    color="black"
                                    fontSize="5xl"
                                    fontWeight="bold"
                                    animation="pulse"
                                >
                                    Choose Diagnosis Type
                                </Text>
                                <HStack w="100%">
                                    <Button
                                        w="48%"
                                        h="30vh"
                                        bg={
                                            selectedDiagnosis === "Depression"
                                                ? palettes.grey
                                                : "white"
                                        }
                                        borderColor={palettes.grey}
                                        borderWidth={2}
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
                                                Depression Diagnosis (PHQ-9)
                                            </Text>
                                            <Image
                                                src={Crying}
                                                h="8vh"
                                                mt="3vh"
                                                mb="1vh"
                                            />
                                            <Text
                                                color="black"
                                                textAlign="start"
                                                whiteSpace="pre-line"
                                                fontSize="xl"
                                            >
                                                The PHQ-9 (Patient Health
                                                Questionnaire-9) is a clinically
                                                validated tool used to screen,
                                                diagnose, and measure the
                                                severity of depression.
                                            </Text>
                                            <Spacer />
                                        </VStack>
                                    </Button>
                                    <Spacer />
                                    <Button
                                        w="48%"
                                        h="30vh"
                                        bg={
                                            selectedDiagnosis === "Dementia"
                                                ? palettes.grey
                                                : "white"
                                        }
                                        borderColor={palettes.grey}
                                        borderWidth={2}
                                        onClick={() => {
                                            if (
                                                selectedDiagnosis !== "Dementia"
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
                                                textAlign="start"
                                                whiteSpace="pre-line"
                                                fontSize="xl"
                                            >
                                                Dementia diagnosis involves a
                                                comprehensive evaluation to
                                                determine the presence and
                                                severity of cognitive decline
                                                that interferes with daily life.
                                            </Text>
                                            <Spacer />
                                        </VStack>
                                    </Button>
                                </HStack>
                                <Button
                                    w="100%"
                                    h="4vh"
                                    bg={palettes.primary}
                                    fontSize="2xl"
                                    color="white"
                                    onClick={() => {
                                        let questions = DEPRESSIONQUESTIONS;
                                        let options = DEPRESSIONOPTIONS;
                                        if (selectedDiagnosis === "Dementia") {
                                            questions = DEMENTIAQUESTIONS;
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
                                    borderRadius="md"
                                    borderWidth={2}
                                    borderColor={palettes.grey}
                                    width="100%"
                                    height="20vh"
                                    p="24px"
                                >
                                    <VStack h="100%" alignItems="center">
                                        <Spacer />
                                        <Text
                                            fontSize="4xl"
                                            fontWeight="bold"
                                            color="black"
                                            textAlign="center"
                                        >
                                            {
                                                state.surveyQuestions.questions[
                                                    state.currentIndex
                                                ]
                                            }
                                        </Text>
                                        <Spacer />
                                        <Text color="black">{`${
                                            state.currentIndex + 1
                                        } / ${
                                            state.surveyQuestions.questions
                                                .length
                                        }`}</Text>
                                    </VStack>
                                </Center>
                                {state.surveyQuestions.options.map((_, idx) => (
                                    <AnswerButton
                                        key={idx}
                                        label={
                                            state.surveyQuestions.options[idx]
                                        }
                                        isSelected={tappedButtonIdx === idx}
                                        handleTap={() => handleAnswerTap(idx)}
                                    />
                                ))}
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
                                        color="black"
                                        fontWeight="bold"
                                        borderColor={palettes.grey}
                                        borderWidth={2}
                                        fontSize="l"
                                        onClick={handleGoPreviousPage}
                                    >
                                        End diagnosis
                                    </Button>
                                </HStack>
                            </>
                        )}
                        {state.status === "done" && (
                            <DiagnosisDone rppgMesurement={measurement} />
                        )}
                    </Container>
                </GridItem>
            </Grid>
        </Container>
    );
}

// Button error -> Chakra snippet 버튼에만 loading이 기본적으로 구현되어있다.
