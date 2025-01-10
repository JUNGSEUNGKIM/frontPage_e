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

import { Container, VStack, Image, Spacer, Heading } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { DynamicEmoji } from "../DynamicEmoji";
import Logo from "@/assets/logo.png";
import CESLogo from "@/assets/ces_logo.png";
import { useEffect, useState } from "react";
// import useSound from "use-sound";

// import { Greetings } from "@/constants/greetings";
import { Tutorial } from "../tutorial/Tutorial";
import CustomAudioPlayer from "../custom/CustomAudioPlayer";

import { useTranslation } from "react-i18next";

export function OnboardingPage() {
    // Load the sound for the next index
    // const [play, { stop }] = useSound(Greetings[nextIndex]?.url);

    const [open, setOpen] = useState(false);

    const [t, i18n] = useTranslation();

    const Greetings = [
        t("greeting1"),
        t("greeting2"),
        t("greeting3"),
        t("greeting4"),
        t("greeting5"),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const nextIndex = (currentIndex + 1) % Greetings.length;

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
            bgGradient="to-r"
            gradientFrom="#EAE4FF"
            gradientTo="#B0E3FF"
        >
            <div className="w-full flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row">
                    <Image src={Logo} h="2vh" ml="2vw" />
                    <Image src={CESLogo} h="2vh" ml="2vw" />
                </div>
                <div className="mr-4">
                    <SelectableLanguageButton
                        label={"English"}
                        onClick={() => i18n.changeLanguage("en")}
                        isSelected={i18n.language === "en"}
                    />
                    <SelectableLanguageButton
                        label={"한국어"}
                        onClick={() => i18n.changeLanguage("ko")}
                        isSelected={i18n.language === "ko"}
                    />
                </div>
            </div>
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
                        <Heading className="font-bold text-4xl">
                            {t("btnStart")}
                        </Heading>
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

function SelectableLanguageButton({
    label,
    isSelected,
    onClick,
}: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`mr-4 w-24 rounded-md py-2 font-bold ${
                isSelected ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
        >
            {label}
        </button>
    );
}
