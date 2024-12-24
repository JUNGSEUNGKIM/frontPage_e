import palettes from "@/constants/colors";
import { Container, VStack, HStack, Image } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { DynamicEmoji } from "../DynamicEmoji";
import Logo from "@/assets/logo.png";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getSpeech } from "@/utls/getSpeech";
import { greetings } from "@/constants/titles";

export function OnboardingPage() {
    // init speech
    useEffect(() => {
        // preload
        window.speechSynthesis.getVoices();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // check is last emoji here
            if (currentIndex === 4) {
                setCurrentIndex(0);
                // change current emoji
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

    useEffect(() => {
        getSpeech(greetings[currentIndex]);
    }, [currentIndex]);

    return (
        <VStack
            w="100vw"
            h="100vh"
            bg={palettes.background}
            bgGradient="to-tr"
            gradientFrom="orange.100"
            gradientTo="blue.200"
        >
            <HStack w="100vw">
                <Image src={Logo} h="2vh" ml={7} mt={7} />
            </HStack>
            <Container height="10vh"></Container>
            <DynamicEmoji width={350} height={350} currentIdx={currentIndex} />
            <Container height="10vh"></Container>
            <Link to="/diagnosis">
                <Button
                    w="50vw"
                    h="4vh"
                    bg={palettes.primary}
                    fontSize="4xl"
                    color="white"
                    borderRadius={12}
                >
                    Lets get started
                </Button>
            </Link>
            <Button
                w="50vw"
                h="4vh"
                bg={palettes.grey}
                fontSize="4xl"
                borderColor={palettes.grey}
                borderRadius={12}
                borderWidth={2}
                color="black"
                mt={1}
            >
                How to use
            </Button>
        </VStack>
    );
}
