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

interface TutorialSlide {
    title: string;
    desc: string;
    emojiUrl: string;
}

const slides: TutorialSlide[] = [
    {
        title: "Welcome!",
        desc: "This kiosk uses rPPG technology to measure\nyour heart rate, stress levels, and emotions.",
        emojiUrl: PartyingEmoji,
    },
    {
        title: "Comprehensive Diagnosis",
        desc: "In addition to rPPG analysis,\nwe provide tools for depression and dementia diagnosis.",
        emojiUrl: MemoEmoji,
    },
    {
        title: "How to Start",
        desc: "Choose the type of diagnosis you want\nand respond to the questions accurately.",
        emojiUrl: Monocle,
    },
    {
        title: "Check Your Results",
        desc: "Once the diagnosis and rPPG analysis are complete,\nyou'll receive a detailed report.",
        emojiUrl: ClipboardEmoji,
    },
    {
        title: "Makeup Notice",
        desc: "Heavy makeup may affect the accuracy of rPPG analysis.\nPlease keep this in mind!",
        emojiUrl: ClownEmoji,
    },
    {
        title: "Camera Tips",
        desc: "For accurate analysis,\navoid moving too much or staying too far from the camera.",
        emojiUrl: DottedEmoji,
    },
];

export function Tutorial() {
    let sliderRef = useRef<null | Slider>(null);
    const navigate = useNavigate();

    const next = () => {
        sliderRef.slickNext();
        setCount((prev) => {
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

    const isLast = count === slides.length - 1;
    // console.log(slides.length - 1);
    // console.log(typeof count);

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
                    <Text fontSize="xl">Skip</Text>
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
                    variant="outline"
                    onClick={previous}
                    mt="5"
                >
                    <Text fontSize="3xl">Previous</Text>
                </Button>
                <Spacer />
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
                        <Text fontSize="3xl">Next</Text>
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
                        <Text fontSize="3xl">Start</Text>
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
