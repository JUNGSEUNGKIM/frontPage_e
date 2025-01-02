import palettes from "@/constants/colors";
import AvatarImg from "@/assets/avatar.png";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";

import {
    Container,
    HStack,
    Text,
    VStack,
    Spacer,
    Heading,
    Image,
    Box,
    Center,
} from "@chakra-ui/react";
import LineChart from "../LineChart";
import Smile from "@/assets/animations/grinning.png";
import Logo from "@/assets/logo.png";
import { ReportBottomButton } from "../ReportBottomButton";
import { EmotionBar } from "../EmotionBar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
    // Title,
    // Tooltip,
    // Legend
);

ChartJS.defaults.scale.ticks.display = false;
ChartJS.defaults.backgroundColor = "white";

const emotions = [
    { name: "기쁨", color: "#FFD700", value: 0.4 },
    { name: "슬픔", color: "#1E90FF", value: 0.2 },
    { name: "분노", color: "#FF4500", value: 0.1 },
    { name: "놀람", color: "#32CD32", value: 0.15 },
    { name: "중립", color: "#A9A9A9", value: 0.15 },
];

export default function ReportPage() {
    return (
        <VStack w="100vw" h="100vh" bg={"white"} p="16px">
            <HStack w="100%" mb="2vh">
                <Spacer />
                <Image src={Logo} h="2vh" mr="2vw" />
            </HStack>
            <Heading color={palettes.black} fontSize="4xl" mb="2vh">
                Diagnosis Result
            </Heading>
            <HStack w="100%" h="25vh">
                <VStack w="30%" h="100%" borderRadius={8} bg={palettes.grey}>
                    <Image src={AvatarImg} w={300} />
                    <Text color="black">user image</Text>
                </VStack>
                <HStack
                    align="start"
                    w="70%"
                    h="100%"
                    borderRadius={8}
                    bg={palettes.grey}
                    p={8}
                >
                    <VStack w="50%">
                        <Heading color="black">
                            Description summary here
                        </Heading>
                        <Text color="black">
                            main description text here. It will be over 3 lines
                        </Text>
                    </VStack>
                    <Spacer />
                    <Center w="40%" h="100%">
                        <CircularProgressbar
                            value={50}
                            text={`score: 50`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "16px",

                                // How long animation takes to go from one 50 to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(62, 152, 199, ${50 / 100})`,
                                textColor: "#f88",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                            })}
                        />
                    </Center>
                </HStack>
            </HStack>
            <HStack w="100%">
                <ChartContainer>
                    <Heading color="black" fontWeight="bold" fontSize="xl">
                        HR
                    </Heading>
                    <LineChart lineColor="red" />
                    <Text color="black">min: 64 max: 84</Text>
                </ChartContainer>
                <ChartContainer>
                    <Heading
                        color="black"
                        fontWeight="bold"
                        fontSize="xl"
                        pb={5}
                    >
                        HRV
                    </Heading>
                    <Container w="22vw">
                        <CircularProgressbar
                            value={78}
                            text={`HRV: 78`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "16px",

                                // How long animation takes to go from one 50 to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(62, 152, 199, ${50 / 100})`,
                                textColor: "#f88",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                            })}
                        />
                    </Container>
                </ChartContainer>
            </HStack>
            <HStack w="100%">
                <ChartContainer>
                    <Heading color="black" fontWeight="bold" fontSize="xl">
                        Emotion
                    </Heading>
                    <HStack w="100%">
                        <VStack w="45%">
                            <Image src={Smile} h="7vh" mt="1vh" />
                            <Text color="black" fontWeight="bold" fontSize="xl">
                                Happy
                            </Text>
                        </VStack>
                        <Center w="100" h="100%">
                            <EmotionBar emotions={emotions} />
                        </Center>
                        <Spacer />
                    </HStack>
                </ChartContainer>
                <ChartContainer>
                    <Heading
                        color="black"
                        fontWeight="bold"
                        fontSize="xl"
                        pb={5}
                    >
                        Stress
                    </Heading>
                    <Container w="22vw">
                        <CircularProgressbar
                            value={12}
                            text={`stress: 12`}
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: "butt",

                                // Text size
                                textSize: "16px",

                                // How long animation takes to go from one 50 to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(62, 152, 199, ${50 / 100})`,
                                textColor: "#f88",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                            })}
                        />
                    </Container>
                </ChartContainer>
            </HStack>
            <HStack w="100%" mt={8}>
                <ReportBottomButton
                    label="Print"
                    outline={false}
                    onClick={() => {
                        print();
                    }}
                />
                <Spacer />

                <ReportBottomButton
                    label="Quit"
                    outline={true}
                    onClick={() => {}}
                />
            </HStack>
        </VStack>
    );
}

function ChartContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container w="50%" h="15vh" bg={palettes.grey} borderRadius={12}>
            {children}
        </Container>
    );
}
