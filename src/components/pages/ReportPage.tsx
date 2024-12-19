import palettes from "@/constants/colors";
import { HStack, Text, VStack, Spacer, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import LineChart from "../LineChart";

export default function ReportPage() {
    return (
        <VStack w="100vw" h="100vh" bg={palettes.background}>
            <VStack
                w="90vw"
                h="70vh"
                mt="2vh"
                bg="white"
                borderRadius={12}
                borderWidth={2}
                borderColor={palettes.grey}
            >
                <Text color="black" fontSize="6xl">
                    REPORT
                </Text>
                <Heading color="black" fontWeight="bold">
                    rPPG Result
                </Heading>
                <HStack w="70vw">
                    <LineChart />
                </HStack>
                <Heading color="black" fontWeight="bold">
                    Your Emotion
                </Heading>
                <Heading color="black" fontWeight="bold">
                    Summary
                </Heading>
            </VStack>
            <HStack>
                <Spacer />
                <ReportBottomButton label="Again" outline={false} />
                <ReportBottomButton label="Quit" outline={true} />
                <Spacer />
            </HStack>
        </VStack>
    );
}

function ReportBottomButton({
    label,
    outline,
}: {
    label: string;
    outline: boolean;
}) {
    if (outline) {
        return (
            <Button
                w="44.7vw"
                h="4vh"
                bg="white"
                color="black"
                borderRadius={12}
                borderWidth={2}
                borderColor={palettes.grey}
                fontSize="4xl"
            >
                {label}
            </Button>
        );
    }

    return (
        <Button
            w="44.7vw"
            h="4vh"
            bg={palettes.primary}
            color="white"
            borderColor={palettes.primary}
            borderRadius={12}
            borderWidth={2}
            fontSize="4xl"
        >
            {label}
        </Button>
    );
}
