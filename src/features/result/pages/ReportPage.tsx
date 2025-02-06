import Logo from "@/assets/logo.png";

import "react-simple-keyboard/build/css/index.css";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { DiagnosisReport } from "@/types";
import { useTranslation } from "react-i18next";

/////////////////////////////////////////////////////////////

// REPLACED`
import { HR, HRV, Emotions, Stress, Summary, Camera } from "../components/index";

/////////////////////////////////////////////////////////////

// Used by the commented HTML blocks
//import { Input } from "../components/input";
//import Keyboard from "react-simple-keyboard";

// screen capture

export default function DiagnosisResult() {
    const [t] = useTranslation();
    const myRef = useRef<HTMLElement | null>(null);

    const location = useLocation();
    const state = location.state as DiagnosisReport; // Type Assertion

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
                    onClick={() => navigate("/", { replace: true })}/>
                
            </div>

            {/* 제목 */}
            <h1 className="text-4xl font-bold text-center mb-16">
                {t("diagnosisResultLabel")}
            </h1>

            {/* 카메라 영상 & 진단 결과 */}
            <div className="flex flex-row gap-4 h-1/5">
                
                <Camera/>
                <Summary state={state}/>
            </div>

            {/* HR & HRV 결과 */}
            <div className="grid grid-cols-2 gap-4">
                <HR state={state}/>
                <HRV state={state}/>
            </div>

            {/* Emotions & Stress 결과 */}
            <div className="grid grid-cols-2 gap-4">
                <Emotions state={state}/>
                <Stress state={state}/>
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