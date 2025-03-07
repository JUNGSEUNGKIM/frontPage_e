import { ReactNode, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import {
    HRResultCard,
    HRVResultCard,
    EmotionResultCard,
    StressResultCard,
    SummaryCard,
} from "../components";
import { DiagnosisResult } from "../types";
import isLandScape from "@/utls/is_landscape";
import LSEmotionResultCard from "../components/LSEmotionResultCard";
import LSStressResultCard from "../components/LSStressResultCard";
import LogoButton from "@/shared/components/LogoButton";

function ScaleTransitionButtonWrapper({
    onClick,
    children,
}: {
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClick}>
            {children}
        </motion.button>
    );
}

export default function ResultPage() {
    const [t] = useTranslation();
    const myRef = useRef<HTMLElement | null>(null);

    const location = useLocation();
    const state = location.state as DiagnosisResult; // Type Assertion

    console.log(state.score);

    const navigate = useNavigate();

    return isLandScape() ? (
        <div className="w-full h-screen flex flex-row bg-[#f8f8f8] pr-4 gap-4">
            {/* SideBar */}
            <div className="w-[6rem] h-full py-32 flex flex-col items-center justify-end bg-blue-500 rounded-r-[50px] gap-10 mr-4">
                <ScaleTransitionButtonWrapper
                    onClick={() => {
                        navigate("/onboarding");
                    }}
                >
                    <BackIcon />
                </ScaleTransitionButtonWrapper>
                <ScaleTransitionButtonWrapper onClick={() => {}}>
                    <DownloadIcon />
                </ScaleTransitionButtonWrapper>
                <div className="h-4" />
            </div>
            {/* results */}
            <div
                id="capture"
                className="w-full h-screen flex flex-col items-start justify-center gap-4"
            >
                <h1 className="text-3xl font-bold">
                    {t("diagnosisResultLabel")}
                </h1>
                <div className="flex flex-row gap-4">
                    <HRResultCard state={state} isLandscape />
                    <HRVResultCard state={state} isLandscape />
                    <div className="w-[25rem] flex flex-col gap-4">
                        <LSStressResultCard state={state} />
                        <LSEmotionResultCard state={state} />
                    </div>
                    {/* <SummaryCard state={state} /> */}
                </div>

                {/* 카메라 영상 & 진단 결과 */}
                {/* <div className="w-1/3 flex flex-row gap-4">
                    <SummaryCard state={state} />
                </div>

                <div className="w-2/3 h-full flex flex-col gap-4">
                    <div className="w-full flex flex-row gap-4">
                        <HRResultCard state={state} />
                        <HRVResultCard state={state} />
                    </div>
                    <div className="w-full flex flex-row gap-4">
                        <div className="w-[23vw] h-full">
                            <LSEmotionResultCard state={state} />
                        </div>
                        <LSStressResultCard state={state} />
                        <div className="w-[23vw] h-full"></div>
                    </div> */}
                {/* </div> */}

                {/* 진단 종료 버튼 */}
                {/* <button
                onClick={() => navigate("/", { replace: true })}
                className="w-full py-4 text-2xl text-white font-bold bg-blue-500 rounded-lg"
            >
                {t("btnQuit")}
            </button> */}
                {/* <span ref={myRef} className="h-1" /> */}
            </div>
        </div>
    ) : (
        <div
            id="capture"
            className="min-h-screen bg-white p-4 flex flex-col gap-4 overflow-auto"
        >
            {/* Logo */}
            <div>
                <LogoButton onClick={() => navigate("/", { replace: true })} />
            </div>

            {/* 제목 */}
            <h1 className="text-3xl font-bold text-center mb-4">
                {t("diagnosisResultLabel")}
            </h1>

            {/* 카메라 영상 & 진단 결과 */}

            <HRResultCard state={state} isLandscape={false} />
            {/* HR & HRV 결과 */}
            <HRVResultCard state={state} isLandscape={false} />

            {/* Emotions & Stress 결과 */}
            <div className="grid grid-cols-2 gap-4">
                <EmotionResultCard state={state} />
                <StressResultCard state={state} />
            </div>

            <div className="flex flex-row gap-4 h-1/5">
                <SummaryCard state={state} />
            </div>

            {/* 진단 종료 버튼 */}
            <button
                onClick={() => navigate("/", { replace: true })}
                className="w-full py-4 text-2xl text-white font-bold bg-blue-500 rounded-lg"
            >
                {t("btnQuit")}
            </button>

            <span ref={myRef} className="h-1" />
        </div>
    );
}

function BackIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-white"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-white"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
        </svg>
    );
}
