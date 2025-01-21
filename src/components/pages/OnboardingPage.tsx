// hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import { DynamicEmoji } from "../DynamicEmoji";
import { SelectableLanguageButton } from "../custom/SelectableLanguageButton";
import { Tutorial } from "../tutorial/Tutorial";
import { LogoButton } from "../custom/LogoButton";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTrigger,
} from "@/components/chakraui/dialog";

<<<<<<< HEAD
// import CustomAudioPlayer from "../custom/CustomAudioPlayer";

// imgs
import CESLogo from "@/assets/ces_logo.png";

export function OnboardingPage() {
=======
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

>>>>>>> d8018315798902166290f11f028995a05acc9904
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
<<<<<<< HEAD
=======
    const nextIndex = (currentIndex + 1) % Greetings.length;
>>>>>>> d8018315798902166290f11f028995a05acc9904

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

<<<<<<< HEAD
    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-300 to-slate-200 flex flex-col items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row">
                    <LogoButton onClick={() => {}} />
                    <img src={CESLogo} className="h-10 mr-4" />
=======
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
>>>>>>> d8018315798902166290f11f028995a05acc9904
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
<<<<<<< HEAD

            <div className="h-full" />

=======
            <Container height="10vh" />
>>>>>>> d8018315798902166290f11f028995a05acc9904
            <DynamicEmoji width={350} height={350} currentIdx={currentIndex} />

            {/* Spacer */}
            <div className="h-full" />

            <DialogRoot
                lazyMount
                open={open}
                size="full"
                onOpenChange={(e) => setOpen(e.open)}
            >
                <DialogTrigger asChild>
                    <OnboardingButton
                        label={t("btnStart")}
                        onClick={() => {
                            stop();
                        }}
<<<<<<< HEAD
                    />
=======
                    >
                        <Heading className="font-bold text-4xl">
                            {t("btnStart")}
                        </Heading>
                    </Button>
>>>>>>> d8018315798902166290f11f028995a05acc9904
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

            {/* Spacer */}
            <div className="h-full" />
            {/* <CustomAudioPlayer /> */}
        </div>
    );
}

// Onbaording Button Component
function OnboardingButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-5/6 py-8 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white text-4xl"
        >
            <h1>{label}</h1>
        </button>
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
