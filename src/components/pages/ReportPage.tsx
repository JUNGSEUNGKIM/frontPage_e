import palettes from "@/constants/colors";

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
    ProgressRoot,
    ProgressLabel,
} from "@chakra-ui/react";
import LineChart from "../LineChart";
import Smile from "@/assets/animations/grinning.png";
import Logo from "@/assets/logo.png";
import { ReportBottomButton } from "../ReportBottomButton";
import { ProgressBar, ProgressValueText } from "../ui/progress";

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

export default function ReportPage() {
    return (
        <VStack w="100vw" h="100vh" bg={"white"} p="16px">
            <HStack w="100%" mb="2vh">
                <Heading color={palettes.black} fontSize="3xl">
                    Diagnosis Report
                </Heading>
                <Spacer />
                <Image src={Logo} h="2vh" mr="2vw" />
            </HStack>
            <Heading color="black" fontWeight="bold" fontSize="2xl" mb="1vh">
                Diagnosis Result
            </Heading>
            <Container
                w="100%"
                h="25vh"
                bg={palettes.grey}
                borderRadius={12}
                p="4"
            >
                <Heading color="black">Description summary here</Heading>
                <Text w="50%" color="black">
                    main description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines main
                    description text here. It will be over 3 lines
                </Text>
                <ProgressRoot defaultValue={20} maxW="xl" bg="grey">
                    <HStack gap="5">
                        <ProgressLabel color="black">Usage</ProgressLabel>
                        <ProgressBar bg={palettes.primary} flex="1" />
                        <ProgressValueText color="black">40%</ProgressValueText>
                    </HStack>
                </ProgressRoot>
            </Container>
            <Box h="1vh" />
            <Heading
                color={palettes.black}
                fontWeight="bold"
                fontSize="2xl"
                mb="1vh"
            >
                rPPG Result
            </Heading>
            <HStack w="100%">
                <ChartContainer>
                    <Heading color="black" fontWeight="bold" fontSize="xl">
                        HR
                    </Heading>
                    <LineChart lineColor="red" />
                    <Text color="black">min: 64 max: 84</Text>
                </ChartContainer>
                <ChartContainer>
                    <Heading color="black" fontWeight="bold" fontSize="xl">
                        HRV
                    </Heading>
                    <LineChart lineColor={palettes.primary} />
                </ChartContainer>
            </HStack>
            <HStack w="100%">
                <ChartContainer>
                    <Heading color="black" fontWeight="bold" fontSize="xl">
                        Stress
                    </Heading>
                    <LineChart lineColor="orange" />
                </ChartContainer>
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
                        <Spacer />
                        <VStack w="45%" h="100%">
                            <Container
                                w="100%"
                                h="2vh"
                                bg="orange"
                                borderRadius={6}
                            >
                                Emotion chart
                            </Container>
                            <Container
                                w="100%"
                                h="8vh"
                                bg="blue"
                                borderRadius={6}
                            >
                                <Text>tooltip here</Text>
                            </Container>
                        </VStack>
                        <Spacer />
                    </HStack>
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
        <Container h="15vh" bg={palettes.grey} borderRadius={12}>
            {children}
        </Container>
    );
}
