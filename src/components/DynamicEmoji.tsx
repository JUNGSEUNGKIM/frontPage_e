import { Container, Image, Text, VStack } from "@chakra-ui/react";
import GrinningEmoji from "@/assets/animations/grinning.png";
import KissEmoji from "@/assets/animations/kiss.png";
import OpenMouthEmoji from "@/assets/animations/open_mouth.png";
import RelieveEmoji from "@/assets/animations/relieve.png";
import WinkingEmoji from "@/assets/animations/winking.png";
import { useState, useEffect } from "react";

const images = [
    GrinningEmoji,
    WinkingEmoji,
    KissEmoji,
    OpenMouthEmoji,
    RelieveEmoji,
];

const greetings = [
    "Welcome!\nReady for a new experience? 😊",
    "Hi there!\nLet’s begin your health journey. 🚀",
    "Look here to start\nyour personal check-up! 📸",
    "Let us see your smile to begin! 😊",
    "Your well-being is our focus.\nLet’s begin! 💓",
];

export function DynamicEmoji({
    width,
    height,
}: {
    width: number;
    height: number;
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log("animated");
        const intervalId = setInterval(() => {
            // check is last emoji here
            if (currentIndex === images.length - 1) {
                setCurrentIndex(0);
                // change current emoji
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <VStack>
            <Image w={width} h={height} src={images[currentIndex]} />;
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
                {greetings[currentIndex]}
            </Text>
        </VStack>
    );
}
