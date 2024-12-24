import { Container, Image, Text, VStack } from "@chakra-ui/react";
import GrinningEmoji from "@/assets/animations/grinning.png";
import KissEmoji from "@/assets/animations/kiss.png";
import OpenMouthEmoji from "@/assets/animations/open_mouth.png";
import RelieveEmoji from "@/assets/animations/relieve.png";
import WinkingEmoji from "@/assets/animations/winking.png";

import { greetings } from "@/constants/titles";

const images = [
    GrinningEmoji,
    WinkingEmoji,
    KissEmoji,
    OpenMouthEmoji,
    RelieveEmoji,
];

// const greetings = [
//     "Welcome!\nReady for a new experience? 😊",
//     "Hi there!\nLet’s begin your health journey. 🚀",
//     "Look here to start\nyour personal check-up! 📸",
//     "Let us see your smile to begin! 😊",
//     "Your well-being is our focus.\nLet’s begin! 💓",
// ];

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
            <Text
                minH="10vh"
                animation="pulse"
                textAlign="center"
                whiteSpace="pre-line"
                textStyle="6xl"
                fontWeight="bold"
                color="black"
            >
                {greetings[currentIdx]}
            </Text>
        </VStack>
    );
}
