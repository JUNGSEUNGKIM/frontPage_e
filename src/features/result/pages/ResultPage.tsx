import Logo from "@/assets/logo.png";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import {
    HRResultCard,
    HRVResultCard,
    EmotionResultCard,
    StressResultCard,
    SummaryCard,
} from "../components";
import { DiagnosisResult } from "../types";

export default function ResultPage() {
    const [t] = useTranslation();
    const myRef = useRef<HTMLElement | null>(null);

    const location = useLocation();
    const state = location.state as DiagnosisResult; // Type Assertion

    const navigate = useNavigate();

    return (
        <div
            id="capture"
            className="min-h-screen bg-white p-4 flex flex-col gap-4 overflow-auto"
        >
            {/* Logo */}
            <div className="p-4">
                <img
                    src={Logo}
                    style={{ height: "2vh", marginRight: "2vw" }}
                    className="mr-auto"
                    onClick={() => navigate("/", { replace: true })}
                />
            </div>

            {/* 제목 */}
            <h1 className="text-4xl font-bold text-center mb-16">
                {t("diagnosisResultLabel")}
            </h1>

            {/* 카메라 영상 & 진단 결과 */}
            <div className="flex flex-row gap-4 h-1/5">
                <SummaryCard state={state} />
            </div>

            {/* HR & HRV 결과 */}
            <div className="grid grid-cols-2 gap-4">
                <HRResultCard state={state} />
                <HRVResultCard state={state} />
            </div>

            {/* Emotions & Stress 결과 */}
            <div className="grid grid-cols-2 gap-4">
                <EmotionResultCard state={state} />
                <StressResultCard state={state} />
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
