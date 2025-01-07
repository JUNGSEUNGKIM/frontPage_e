import { useEffect, useState, useRef } from "react";
import {HStack, Container, Spacer, Text, Center, VStack, Heading, Image, Box} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Api } from "@/constants/api";
import { Tutorial } from "./tutorial/Tutorial";
import Slider from "react-slick";
import palettes from "@/constants/colors.tsx";
import {useNavigate} from "react-router";
import PartyingEmoji from "@/assets/animations/partying.png";
import MemoEmoji from "@/assets/animations/memo.png";
import Monocle from "@/assets/animations/monocle.png";
import ClipboardEmoji from "@/assets/animations/clip.png";
import ClownEmoji from "@/assets/animations/clown.png";
import DottedEmoji from "@/assets/animations/dotted.png";
import LucidImg from "@/assets/dtximg/lucid_img.jpg";
import Expression from "@/assets/dtximg/expression_img.gif";
import Difference from "@/assets/dtximg/difference_img.jpg";
import MemoryImg from "@/assets/dtximg/memory_img.png";
// TODO: 1. create loading component
// TODO: 2. create interface for api call using axios
// TODO: 3. connect lucid website to iframe
// TODO: 4. handling error status

// required status : init, loading, done ,error
interface TutorialSlide {
    title: string;
    desc: string;
    emojiUrl: string;
}
type DTxStatus = "init" | "loading" | "done" | "error";
const slides: TutorialSlide[] = [
    {
        title: "sound therapy application Lucid",
        desc: "",
        emojiUrl: LucidImg,
    },
    {
        title: "Memory Game",
        desc: "In addition to rPPG analysis,\nwe provide tools for depression and dementia diagnosis.",
        emojiUrl: MemoryImg,
    },
    {
        title: "Let's play a Spot the Difference game!",
        desc: "Choose the type of diagnosis you want\nand respond to the questions accurately.",
        emojiUrl: Difference,
    },

    {
        title: "Let's play the Copy the Expression game!",
        desc: "Heavy makeup may affect the accuracy of rPPG analysis.\nPlease keep this in mind!",
        emojiUrl: Expression,
    },

];
export function DtxFragment() {
    const [currentStatus, setCurrentStatus] = useState<DTxStatus>("init");
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
        dots: true,
        infinite: false,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        // nextArrow: <></>,
        // prevArrow: <></>,
    };
    const [count, setCount] = useState(0);

    const isLast = count === slides.length - 1;
    // console.log(slides.length - 1);
    // console.log(typeof count);
    useEffect(
        () => {},
        // 1. post -> fetch token
        // wait, -> rendering loading component
        // 2. get ->  fetch website to iframe
        []
    );

    return (
        <Container  h="10vh" className="slider-container" w="100%" maxW="50vh">
            {currentStatus === "init" && <SelectDtxComponent />}
            {currentStatus === "loading" && <LoadingComponent />}
            {currentStatus === "done" && <EmbbededLucid />}
            {currentStatus === "error" && <DtxErrorItem />}
            {/*<HStack>*/}
            {/*    <Spacer />*/}
            {/*    <Button*/}
            {/*        w="10vw"*/}
            {/*        h="3vh"*/}
            {/*        variant="outline"*/}
            {/*        onClick={() => {*/}
            {/*            navigate("diagnosis");*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Text fontSize="xl">Skip</Text>*/}
            {/*    </Button>*/}
            {/*</HStack>*/}
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
            <HStack w="100%" mt="-2vh">
                <Button
                    w="20vw"
                    h="4vh"
                    borderColor={palettes.grey}
                    borderRadius={12}
                    borderWidth={5}
                    onClick={previous}
                    mt="5"
                >
                    <Text fontSize="3xl">Previous</Text>
                </Button>
                <Spacer />
                <Spacer />

                    <Button
                        w="20vw"
                        h="4vh"
                        borderColor={palettes.grey}
                        borderRadius={12}
                        borderWidth={5}
                        onClick={next}
                        mt="5"
                    >
                        <Text fontSize="3xl" >
                            Next
                        </Text>
                    </Button>

            </HStack>
        </Container>

    );
}

// init
// selectable buttons,
function SelectDtxComponent() {
    return <HStack></HStack>;
}

function LoadingComponent() {
    return <></>;
}

function DtxErrorItem() {
    return <></>;
}

function EmbbededLucid() {
    // experience key
    // const url = Api.lucid + "";
    return <iframe></iframe>;
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
        <Center h="50vh" mt="0vh">
            <VStack>

                <Image src={emojiUrl} h="35vh" mb={10} />
                {/*<Box h="30vh" w="100%" mb={10}>*/}
                {/*    <iframe*/}
                {/*        src="https://www.wikipedia.org" // 외부 콘텐츠의 URL*/}
                {/*        title="iframe content"*/}
                {/*        style={{*/}
                {/*            width: '100%',*/}
                {/*            height: '100%',*/}
                {/*            border: 'none',*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Box>*/}
                {/*<Text*/}
                {/*    lineHeight={1.2}*/}
                {/*    fontSize="4xl"*/}
                {/*    textAlign="center"*/}
                {/*    whiteSpace="pre-line"*/}
                {/*    color="black"*/}
                {/*>*/}
                {/*    {desc}*/}
                {/*</Text>*/}
                <Heading fontSize="3xl" color="black" mb={10}>
                   <a onClick={()=>{alert("Coming soon.")}}>[ {title} ]</a>
                </Heading>
            </VStack>
        </Center>
    );
}
