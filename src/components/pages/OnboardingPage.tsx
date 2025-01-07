import palettes from "@/constants/colors";

import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTrigger,
} from "@/components/chakraui/dialog";

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
import CESLogo from "@/assets/ces_logo.png";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import { Greetings } from "@/constants/greetings";
import { Tutorial } from "../tutorial/Tutorial";
import CustomAudioPlayer from "../custom/CustomAudioPlayer";

export function OnboardingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextIndex = (currentIndex + 1) % Greetings.length;

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

    useEffect(() => {
        // currentIndex가 변경될 때마다 재생
        if (open) {
            return;
        }
        play();
    }, [currentIndex]);

    return (
        <VStack
            w="100vw"
            h="100vh"
            bg={palettes.background}
            bgGradient="to-r"
            gradientFrom="#EAE4FF"
            gradientTo="#B0E3FF"
        >
            <HStack w="100vw">
                <Image src={Logo} h="2vh" mt="2vw" ml="2vw" />
                <Image src={CESLogo} h="2vh" mt="2vw" ml="2vw" />
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
                        <Heading className="font-bold text-4xl">{`Get Started`}</Heading>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader></DialogHeader>
                    <DialogBody>
                        <Tutorial />
                    </DialogBody>
                    <DialogFooter></DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
            <Spacer />
            <CustomAudioPlayer />
            <Container h="5vh" />
        </VStack>
    );
}
