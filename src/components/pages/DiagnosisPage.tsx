import { useState, useRef } from "react";
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
import { AnswerButton } from "@/components/custom/AnswerButton";
import { Button } from "@/components/ui/button";
import { RppgMeasurementList } from "@/components/custom/RppgResults";
// import Webcam from "react-webcam";
import FaceDetectionApp from "@/components/FaceDetectionApp15";
import { RPPGMeasurement } from "@/types/rppg_types";
import { useSurvey } from "@/hooks/useSurvey";

import { useNavigate } from "react-router";
import Crying from "@/assets/animations/crying.png";
import Thinking from "@/assets/animations/thinking.png";
import { DiagnosisDone } from "@/components/fragment/DiagnosisDone";
import { ChatFragment } from "../fragment/ChatFragment";
import { DiagnosisType } from "@/types";
import DtxFragmentV2 from "../fragment/DtxFragmentV2";
import { useTranslation } from "react-i18next";
import { LogoButton } from "../custom/LogoButton";

type Tap = "chat" | "diagnosis" | "dtx";

export function DiagnosisPage() {
    // i18n hook
    const [t] = useTranslation();

    const DEPRESSIONQUESTIONS = [
        t("depressionQuestion1"), // "Experiencing a lack of motivation or interest"
        t("depressionQuestion2"), // "Feeling down, depressed, or hopeless"
        t("depressionQuestion3"), // "Frequently sleep deprived, oversleeping, or having trouble falling asleep"
        t("depressionQuestion4"), // "Lacking energy or constantly feeling fatigued"
        t("depressionQuestion5"), // "Having poor appetite or overeating"
        t("depressionQuestion6"), // "Feeling dissatisfied with yourself, or believe that you are a failure or have let yourself or your family down"
        t("depressionQuestion7"), // "Trouble concentrating on things, such as reading the newspaper or watching television"
        t("depressionQuestion8"), // "Moving/speaking very slowly or restlessly, causing others to take notice of your behaviors"
        t("depressionQuestion9"), // "Have recently attempted or thought of self harm or committing suicide"
    ];

    const DEPRESSIONOPTIONS = [
        t("depressionOption1"), // "1. Not at all"
        t("depressionOption2"), // "2. Few days a week"
        t("depressionOption3"), // "3. About half of a week"
        t("depressionOption4"), // "4. Nearly every day"
    ];

    const DEMENTIAQUESTIONS = [
        t("dementiaQuestion1"), // "Having difficulty recalling recent past events"
        t("dementiaQuestion2"), // "Easily forget things you heard a few days ago"
        t("dementiaQuestion3"), // "Having trouble breaking and changing the pattern in repetitive daily activities"
        t("dementiaQuestion4"), // "Forgetting things that are personally important"
        t("dementiaQuestion5"), // "Repetitively doing something and then forgetting about it"
        t("dementiaQuestion6"), // "Forgetting promises you have made"
        t("dementiaQuestion7"), // "Forgetting the topic while having a conversation"
        t("dementiaQuestion8"), // "Unable to immediately think of what to say or express"
        t("dementiaQuestion9"), // "Unable to quickly recall the names of everyday objects"
        t("dementiaQuestion10"), // "Having difficulty understanding the content of television shows"
        t("dementiaQuestion11"), // "Unable to recall the places you have visited"
        t("dementiaQuestion12"), // "Having been lost or wandering"
        t("dementiaQuestion13"), // "Having difficulty solving simple math problems"
        t("dementiaQuestion14"), // "Making mistakes in managing money"
        t("dementiaQuestion15"), // "Having difficulty using equipment that you have used in the past"
    ];

    const DEMENTIAOPTIONS = [
        t("dementiaOption1"), // "1. Not at all"
        t("dementiaOption2"), // "2. Sometimes"
        t("dementiaOption3"), // "3. Often"
    ];

    const navigate = useNavigate();
    // current tap
    const [currentTap, setCurrentTap] = useState<Tap>("diagnosis");

    const [selectedDiagnosis, setSelectedDiagnosis] =
        useState<DiagnosisType>("Depression");

    const hrRef = useRef<string[]>([]);

    // button clicked check
    // const [isProcessing, setIsProcessing] = useState(false);

    const [tappedButtonIdx, setTappedButtonIdx] = useState<number | null>(null);

    const { state, startSurvey, initSurvey, answerQuestion, goBack } =
        useSurvey();
    // status : init / progress / done

    const [measurement, setMeasurement] = useState<RPPGMeasurement>({
        hr: "0",
        hrv: "0",
        stress: "0",
        emotion: "None",
        emotionResult: {
            Angry: 0,
            Happy: 0,
            Disgusted: 0,
            Fearful: 0,
            Neutral: 0,
            Sad: 0,
            Surprised: 0,
        },
    });

    // handle rppg
    function handleMeasurement(newValue: RPPGMeasurement) {
        if (newValue.emotion === "") {
            setMeasurement({ ...newValue, emotion: "None" });
        } else {
            setMeasurement(newValue);
        }
        if (newValue.hr !== "0") {
            hrRef.current.push(newValue.hr);
        }

        console.log(hrRef.current);
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
            <div className="w-full flex flex-row justify-between mt-4 mr-4">
                <LogoButton onClick={handleGoPreviousPage} />
                <Group>
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
                            {t("tapBtnDiagnosis")}
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
                            {t("tapBtnDtx")}
                        </Text>
                    </Button>
                    {/* <Button
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
                            {t("tapAIChat")}
                        </Text>
                    </Button> */}
                </Group>
            </div>
            <Grid
                w="100vw"
                templateRows="28% 60% 6%"
                minHeight="95vh"
                pt="10px"
                gap="5"
            >
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
                                    <VStack w="100%" gap={4}>
                                        <Text
                                            color="black"
                                            fontSize="5xl"
                                            fontWeight="bold"
                                            animation="pulse"
                                            mt="3"
                                        >
                                            {t("chooseDiagnosisTypeLabel")}
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
                                                        {t(
                                                            "DepressionDiagnosisLabel"
                                                        )}
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
                                                        {t(
                                                            "depressionDescription"
                                                        )}
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
                                                        {t(
                                                            "DementiaDiagnosisLabel"
                                                        )}
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
                                                        {t(
                                                            "dementiaDescription"
                                                        )}
                                                    </Text>
                                                    <Spacer />
                                                </VStack>
                                            </Button>
                                        </HStack>
                                        <Button
                                            w="94vw"
                                            h="4vh"
                                            mt={3}
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
                                            className="shadow bg-blue-500"
                                        >
                                            {t("btnStartDiagnosis")}
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
                                            mt={4}
                                            p="24px"
                                            className="w-full"
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
                                                    className="w-full"
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
                                                    if (
                                                        state.currentIndex === 0
                                                    ) {
                                                        initSurvey();
                                                    }
                                                    goBack();
                                                }}
                                                className="shadow"
                                            >
                                                {t("btnPrev")}
                                            </Button>
                                        </HStack>
                                        <Container h="10vh" />
                                        <Button
                                            w="100%"
                                            h="3vh"
                                            bg="white"
                                            fontWeight="bold"
                                            borderColor={palettes.grey}
                                            // borderWidth={2}
                                            borderRadius={12}
                                            color="black"
                                            fontSize="l"
                                            onClick={handleGoPreviousPage}
                                            className="shadow"
                                        >
                                            {t("btnStop")}
                                        </Button>
                                    </>
                                )}
                                {state.status === "done" && (
                                    <DiagnosisDone
                                        rppgMesurement={measurement}
                                        hrValues={hrRef.current}
                                        selectedDiagnosisType={
                                            selectedDiagnosis
                                        }
                                        answers={state.responses}
                                    />
                                )}
                            </>
                        )}
                        {/* Add Chat fragment here */}
                        {currentTap === "chat" && <ChatFragment />}
                        {currentTap === "dtx" && <DtxFragmentV2 />}
                    </Container>
                </GridItem>
            </Grid>
        </VStack>
    );
}

// Button error -> Chakra snippet 버튼에만 loading이 기본적으로 구현되어있다.
