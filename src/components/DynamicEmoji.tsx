import { Container, Heading, Image, VStack } from "@chakra-ui/react";
import GrinningEmoji from "@/assets/animations/grinning.png";
import KissEmoji from "@/assets/animations/kiss.png";
import OpenMouthEmoji from "@/assets/animations/open_mouth.png";
import RelieveEmoji from "@/assets/animations/relieve.png";
import WinkingEmoji from "@/assets/animations/winking.png";
import { useTranslation } from "react-i18next";

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
    const [t, i18n] = useTranslation();

    const Greetings = [
        t("greeting1"),
        t("greeting2"),
        t("greeting3"),
        t("greeting4"),
        t("greeting5"),
    ];
    return (
        <VStack>
            <Image w={width} h={height} src={images[currentIdx]} />
            <Container h={100} />
            <Heading
                minH="18vh"
                animation="pulse"
                textAlign="center"
                whiteSpace="pre-line"
                textStyle="7xl"
                fontWeight="bold"
                color="black"
                pl={3}
                pr={3}
            >
                {Greetings[currentIdx]}
            </Heading>
        </VStack>
    );
}
