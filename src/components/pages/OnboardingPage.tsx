import palettes from "@/constants/colors";

import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Container,
    VStack,
    HStack,
    Image,
    Spacer,
    Heading,
} from "@chakra-ui/react";
import { Button } from "../ui/button";
import { DynamicEmoji } from "../DynamicEmoji";
import Logo from "@/assets/logo.png";
import { Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import bgm from "@/assets/audio/focus.mp3";

import { Greetings } from "@/constants/greetings";
import { Tutorial } from "../tutorial/Tutorial";

export function OnboardingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextIndex = (currentIndex + 1) % Greetings.length;
    const audioRef = useRef(null);

    // html 요소 접근 -> useRef 활용
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; // 기본 볼륨을 50%로 설정
        }
    }, []);

    // Load the sound for the next index
    const [play, { stop }] = useSound(Greetings[nextIndex]?.url);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 최신 currentIndex 값을 참조
            setCurrentIndex((prev) => {
                if (prev === Greetings.length - 1) {
                    return 0;
                }
                return prev + 1;
            });
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    // useEffect(() => {
    //     // currentIndex가 변경될 때마다 재생
    //     if (open) {
    //         return;
    //     }
    //     play();
    // }, [currentIndex]);

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
                <Spacer />
            </HStack>
            <Container height="10vh" />
            <DynamicEmoji width={350} height={350} currentIdx={currentIndex} />
            <Container height="20vh" />
            <DialogRoot
                lazyMount
                open={open}
                size="full"
                onOpenChange={(e) => setOpen(e.open)}
            >
                <DialogTrigger asChild>
                    <Button
                        w="80vw"
                        h="5vh"
                        bg={palettes.primary}
                        color="white"
                        borderRadius={12}
                        onClick={() => {
                            stop();
                        }}
                    >
                        <Heading size="5xl">{`Let's begin !`}</Heading>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tutorial</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Tutorial />
                        {/* <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger> */}
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
            <Spacer />
            <audio ref={audioRef} id="bgm" src={bgm} loop controls />
            <Container h="5vh" />
        </VStack>
    );
}
