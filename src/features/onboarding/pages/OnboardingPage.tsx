// hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
// components
import {
    OnboardingButton,
    SelectableLanguageButton,
    DynamicEmoji,
} from "../components";
import LogoButton from "@/shared/components/LogoButton";
// assets
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import isLandScape from "@/utls/is_landscape";
import { useUserStore } from "@/shared/stores/userStore";
import { useMemberDataGet } from "@/shared/services/userService";

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

    const { loginAsMember } = useUserStore();

    // DEBUG TEMP - automatic user login for testing
    const member = useMemberDataGet(1);
    useEffect(() => {
        if (member.isSuccess) {
            loginAsMember(member.data);
        }
    }, [member.isSuccess]);

    const { init } = useDiagnosisStore();

    // for dynamic emoji
    useEffect(() => {
        init();

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

    return isLandScape() ? (
        <div className="w-screen h-screen flex flex-col items-center justify-between bg-gradient-to-br from-[#E0E4FF] to-[#BFE4FF]">
            <OnboardingAppBar />
            <DynamicEmoji currentIdx={currentIndex} />
            <OnboardingBottomToolBar />
        </div>
    ) : (
        <div className="w-full h-screen bg-gradient-to-r from-blue-300 to-slate-200 flex flex-col items-center justify-center">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="h-16 flex flex-row items-center mr-4">
                    <LogoButton isWhite onClick={() => {}} />
                </div>
                <div className="flex flex-row mr-4 gap-4">
                    <SelectableLanguageButton
                        label={"EN"}
                        onClick={() => i18n.changeLanguage("en")}
                        isSelected={i18n.language === "en"}
                        cy="selectable-en"
                    />
                    <SelectableLanguageButton
                        label={"KR"}
                        onClick={() => i18n.changeLanguage("ko")}
                        isSelected={i18n.language === "ko"}
                        cy="selectable-ko"
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

            <div className="h-full" />
        </div>
    );
}

function OnboardingAppBar() {
    return (
        <div className="w-full flex flex-row items-center justify-between mt-4">
            <div className="flex flex-row">
                <LogoButton onClick={() => {}} />
            </div>
        </div>
    );
}

function OnboardingBottomToolBar() {
    const [t, i18n] = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="w-full px-8 py-8 flex flex-row items-center justify-between bg-blue-500 rounded-t-3xl shadow">
            <motion.button
                onClick={() => {
                    navigate("/tutorial");
                }}
                whileTap={{ scale: 0.95 }}
                className="w-[70%] h-full p-8 flex flex-col items-center justify-center bg-white rounded-2xl  text-black text-3xl font-bold shadow-xl"
                data-cy="ls-start-button"
            >
                <h1>{t("btnStart")}</h1>
            </motion.button>

            <div className="h-full flex flex-row items-center justify-center bg-white rounded-xl p-3 gap-8">
                <SelectableLanguageButton
                    label={"🇬🇧"}
                    onClick={() => i18n.changeLanguage("en")}
                    isSelected={i18n.language === "en"}
                    cy="ls-selectable-en"
                />
                <SelectableLanguageButton
                    label={"🇰🇷"}
                    onClick={() => i18n.changeLanguage("ko")}
                    isSelected={i18n.language === "ko"}
                    cy="ls-selectable-ko"
                />
            </div>
        </div>
    );
}
