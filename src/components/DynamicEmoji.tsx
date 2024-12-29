import { Container, Heading, Image, VStack } from "@chakra-ui/react";
import GrinningEmoji from "@/assets/animations/grinning.png";
import KissEmoji from "@/assets/animations/kiss.png";
import OpenMouthEmoji from "@/assets/animations/open_mouth.png";
import RelieveEmoji from "@/assets/animations/relieve.png";
import WinkingEmoji from "@/assets/animations/winking.png";

import { Greetings } from "@/constants/greetings";

const images = [
    GrinningEmoji,
    WinkingEmoji,
    KissEmoji,
    OpenMouthEmoji,
    RelieveEmoji,
    WinkingEmoji,
    GrinningEmoji,
    GrinningEmoji,
    GrinningEmoji,
];

export function DynamicEmoji({
    width,
    height,
    currentIdx,
}: {
    width: number;
    height: number;
    currentIdx: number;
}) {
    return (
        <VStack>
            <Image w={width} h={height} src={images[currentIdx]} />;
            <Container h={100} />
            <Heading
                minH="10vh"
                animation="pulse"
                textAlign="center"
                whiteSpace="pre-line"
                textStyle="7xl"
                fontWeight="bold"
                color="black"
                pl={3}
                pr={3}
            >
                {Greetings[currentIdx].text}
            </Heading>
        </VStack>
    );
}
