import palettes from "@/constants/colors";
import { HStack, Text, VStack, Spacer } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
    return (
        <VStack w="100vw" h="100vh" bg={palettes.background}>
            <VStack w="90vw" h="70vh" mt="2vh" bg="orange" borderRadius={12}>
                <Text color="black" fontSize="6xl">
                    REPORT
                </Text>
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
