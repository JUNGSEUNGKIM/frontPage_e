// hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// components
import {
    OnboardingButton,
    SelectableLanguageButton,
    DynamicEmoji,
} from "../components";
import LogoButton from "@/shared/components/LogoButton";
// assets
import CESLogo from "@/assets/ces_logo.png";
import { useNavigate } from "react-router";

export function OnboardingPage() {
    const navigate = useNavigate();

    const [t, i18n] = useTranslation();

    const Greetings = [
        t("greeting1"),
        t("greeting2"),
        t("greeting3"),
        t("greeting4"),
        t("greeting5"),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // for dynamic emoji
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

    // Check landscape mode
    useEffect(() => {}, []);

    return (
        <div className="w-full h-screen bg-gradient-to-r from-blue-300 to-slate-200 flex flex-col items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row">
                    <LogoButton onClick={() => {}} />
                    <img src={CESLogo} className="h-10 mr-4" />
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

            <div className="h-full" />

            <DynamicEmoji currentIdx={currentIndex} />

            {/* Spacer */}
            <div className="h-full" />

            <OnboardingButton
                label={t("btnStart")}
                onClick={() => {
                    navigate("/diagnosis");
                }}
            />

            {/* Spacer */}
            <div className="h-full" />
            {/* <CustomAudioPlayer /> */}
        </div>
    );
}
