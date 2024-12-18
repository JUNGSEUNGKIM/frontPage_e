import palettes from "@/constants/colors";
import { Container, VStack, HStack, Image } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { DynamicEmoji } from "../DynamicEmoji";
import Logo from "@/assets/logo.png";
import { Link } from "react-router";

export function OnboardingPage() {
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
                <Image src={Logo} h="2vh" ml={3} mt={3} />
            </HStack>
            <Container height="10vh"></Container>
            <DynamicEmoji width={350} height={350} />
            <Container height="10vh"></Container>
            <Link to="/diagnosis">
                <Button
                    size="2xl"
                    bg={palettes.primary}
                    fontSize="4xl"
                    color="white"
                >
                    Lets get started
                </Button>
            </Link>
        </VStack>
    );
}
