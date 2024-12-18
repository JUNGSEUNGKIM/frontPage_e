import { useEffect, useState } from "react";
import { bg, grey, primary } from "@/constants/colors";
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

interface Diagnosis {
    status: "init" | "onProgress" | "done";
    currentIndex: number;
    answers: number[];
}

type Tap = "chat" | "diagnosis" | "lucid";

export function DiagnosisPage() {
    // current tap
    const [currentTap, setCurrentTap] = useState<Tap>("diagnosis");
    // button clicked check
    const [isProcessing, setIsProcessing] = useState(false);
    // answer button index
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    // status : init / progress / done
    const [diagnosis, setDiagnosis] = useState<Diagnosis>({
        status: "init",
        currentIndex: 0,
        answers: [],
    });

    const [measurement, setMeasurement] = useState<RPPGMeasurement>({
        hr: "0",
        hrv: "0",
        stress: "0",
        emotion: "None",
    });

    // get question data from server
    useEffect(() => {
        // console.log(diagnosis.currentIndex);
    }, [diagnosis]);

    // handle rppg
    function handleMeasurement(newValue: RPPGMeasurement) {
        setMeasurement(newValue);
    }

    function handleTap(selectedTap: Tap) {
        // selectedTap : string
        setCurrentTap(selectedTap);
    }

    function handleButtonClick(idx: number) {
        if (isProcessing) return;
        setIsProcessing(true);
        setSelectedIdx(idx);
        setDiagnosis({
            ...diagnosis,
            currentIndex: diagnosis.currentIndex + 1,
        });

        setTimeout(() => {
            setSelectedIdx(null);
            setIsProcessing(false);
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
                                질문 텍스트가 들어가는 공간입니다. 텍스트 길이는
                                어느정도까지 잘나올까요? 최대 길이를
                                체크해야합니다.
                            </Text>
                        </VStack>
                    </Square>
                    {/* Array -> question answers */}
                    {/* Create question and answers object */}
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <AnswerButton
                            key={idx}
                            label="질문 답변 예제"
                            isSelected={selectedIdx === idx}
                            handleTap={() => handleButtonClick(idx)}
                        />
                    ))}
                </GridItem>
            </Grid>
        </Container>
    );
}

// Button error -> Chakra snippet 버튼에만 loading이 기본적으로 구현되어있다.
