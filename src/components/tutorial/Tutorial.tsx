// TODO: Add extra emojis
import {
    Image,
    Container,
    HStack,
    Spacer,
    Text,
    Center,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { Button } from "../ui/button";
import Slider from "react-slick";
import { useRef, useState } from "react";
import palettes from "@/constants/colors";
import PartyingEmoji from "@/assets/animations/partying.png";
import ClownEmoji from "@/assets/animations/clown.png";
import ClipboardEmoji from "@/assets/animations/clip.png";
import DottedEmoji from "@/assets/animations/dotted.png";
import MemoEmoji from "@/assets/animations/memo.png";
import Monocle from "@/assets/animations/monocle.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface TutorialSlide {
    title: string;
    desc: string;
    emojiUrl: string;
}

export function Tutorial() {
    const [t, i18n] = useTranslation();

    let sliderRef = useRef<null | Slider>(null);
    const navigate = useNavigate();

    const next = () => {
        sliderRef.slickNext();
        setCount((prev) => {
            if (prev >= slides.length) {
                return prev;
            }
            return prev + 1;
        });
    };
    const previous = () => {
        sliderRef.slickPrev();
        setCount((prev) => {
            if (prev === 0) {
                return prev;
            }
            return prev - 1;
        });
    };

    const slides: TutorialSlide[] = [
        {
            title: t("welcomeLabel"),
            desc: t("kioskInfoDescription"),
            emojiUrl: PartyingEmoji,
        },
        {
            title: t("ComprehensiveDiagnosisLabel"),
            desc: t("diagnosisInfoDescription"),
            emojiUrl: MemoEmoji,
        },
        {
            title: t("howToStartLabel"),
            desc: t("howToStartDescription"),
            emojiUrl: Monocle,
        },
        {
            title: t("checkYourResultsLabel"),
            desc: t("checkYourResultDescription"),
            emojiUrl: ClipboardEmoji,
        },
        {
            title: t("disclaimerLabel"),
            desc: t("disclaimerDescription"),
            emojiUrl: ClownEmoji,
        },
        {
            title: t("cameraTipsLabel"),
            desc: t("cameraTipsDescription"),
            emojiUrl: DottedEmoji,
        },
    ];

    const settings = {
        dots: false,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        nextArrow: <></>,
        prevArrow: <></>,
    };
    const [count, setCount] = useState(0);

    const isLast = count == slides.length - 1;

    return (
        <Container h="100%" className="slider-container">
            <HStack>
                <Spacer />
                <Button
                    w="10vw"
                    h="3vh"
                    variant="outline"
                    onClick={() => {
                        navigate("diagnosis");
                    }}
                >
                    <Text fontSize="xl">{t("btnSkip")}</Text>
                </Button>
            </HStack>
            <Slider
                ref={(slider) => {
                    sliderRef = slider;
                }}
                {...settings}
            >
                {slides.map((value) => {
                    return (
                        <Slide
                            key={value.title}
                            title={value.title}
                            desc={value.desc}
                            emojiUrl={value.emojiUrl}
                        />
                    );
                })}
            </Slider>
            <HStack w="100%" mt="24vh">
                <Button
                    w="40vw"
                    h="4vh"
                    borderColor={palettes.grey}
                    borderRadius={12}
                    borderWidth={2}
                    onClick={previous}
                    mt="5"
                >
                    <Text fontSize="3xl">{t("btnPrevious")}</Text>
                </Button>
                <Spacer />
                {!isLast && (
                    <Button
                        bg={palettes.primary}
                        size="2xl"
                        w="40vw"
                        h="4vh"
                        onClick={next}
                        mt="5"
                    >
                        <Text fontSize="3xl" color="white">
                            {t("btnNext")}
                        </Text>
                    </Button>
                )}
                {isLast && (
                    <Button
                        bg={palettes.primary}
                        size="2xl"
                        w="40vw"
                        h="4vh"
                        onClick={() => {
                            navigate("diagnosis");
                        }}
                        mt="5"
                    >
                        <Text fontSize="3xl" color="white">
                            {t("btnStart")}
                        </Text>
                    </Button>
                )}
            </HStack>
        </Container>
    );
}

function Slide({
    title,
    desc,
    emojiUrl,
}: {
    title: string;
    desc: string;
    emojiUrl: string;
}) {
    return (
        <Center h="50vh" mt="5vh">
            <VStack>
                <Heading fontSize="7xl" color="black" mb={32}>
                    {title}
                </Heading>
                <Image src={emojiUrl} h="18vh" mb={32} />
                <Text
                    lineHeight={1.2}
                    fontSize="4xl"
                    textAlign="center"
                    whiteSpace="pre-line"
                    color="black"
                >
                    {desc}
                </Text>
            </VStack>
        </Center>
    );
}
