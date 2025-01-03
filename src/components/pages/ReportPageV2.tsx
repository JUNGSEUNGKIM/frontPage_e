import { Area, AreaChart, Label, Pie, PieChart } from "recharts";

import { Button } from "@/components/ui/button";
import { Image } from "@chakra-ui/react";
import { Card, CardContent } from "@/components/ui/card";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Logo from "@/assets/logo.png";
import palettes from "@/constants/colors";
import HeartBeat from "@/assets/heartbeat2.png";

import { Input } from "../ui/input";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { DiagnosisReport } from "@/types";
import Webcam from "react-webcam";

const chartConfig = {
    scores: {
        label: "scores",
    },
    left: {
        label: "left",
        color: "hsl(var(--chart-1))",
    },
    get: {
        label: "get",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function DiagnosisResult() {
    // 웹캠 참조 타입 명시
    const webcamRef = useRef<Webcam>(null);

    // 상태 타입 명시
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처된 이미지
    const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운 값 (초 단위)

    // 카운트다운 로직
    useEffect(() => {
        if (countdown === null) return;

        if (countdown > 0) {
            const timer = setTimeout(
                () => setCountdown((prev) => (prev ?? 0) - 1),
                1000
            );
            return () => clearTimeout(timer);
        }

        if (countdown === 0) {
            captureImage(); // 캡처 실행
        }
    }, [countdown]);

    // 이미지 캡처 함수
    const captureImage = (): void => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setCountdown(null); // 카운트다운 종료
        }
    };

    // 재촬영
    const retakeImage = (): void => {
        setCapturedImage(null);
        setCountdown(5); // 카운트다운 시작
    };

    const myRef = useRef<HTMLElement | null>(null);

    const location = useLocation();
    const state = location.state as DiagnosisReport; // Type Assertion

    // console.log(state);

    const hrData = state.hrValues.map((e: string, i: number) => {
        return { time: `${i}`, value: Number(e) };
    });
    const convertedHrValues = state.hrValues.map((e) => Number(e));
    const hrValuesMin = Math.min(...convertedHrValues);
    const hrValuesMax = Math.max(...convertedHrValues);
    const hrValuesMean = Math.floor(
        convertedHrValues.reduce(
            (ac: number, current: number) => ac + current,
            0
        ) / state.hrValues.length
    );
    const score = state.score;
    const emotions = [
        {
            label: "Angry",
            emoji: "😡",
            color: "#FF0000", // 빨간색으로 화남을 표현
            value: Number(state.measurement.emotionResult.Angry), // 값 참조
        },
        {
            label: "Disgusted",
            emoji: "😫",
            color: "#8B0000", // 어두운 빨간색
            value: Number(state.measurement.emotionResult.Disgusted),
        },
        {
            label: "Fearful",
            emoji: "😨",
            color: "#800080", // 보라색
            value: Number(state.measurement.emotionResult.Fearful),
        },
        {
            label: "Happy",
            emoji: "😄",
            color: "##facc15", // 노란색
            value: Number(state.measurement.emotionResult.Happy),
        },
        {
            label: "Neutral",
            emoji: "🙂",
            color: "#808080", // 회색
            value: Number(state.measurement.emotionResult.Neutral),
        },
        {
            label: "Sad",
            emoji: "😢",
            color: "#0000FF", // 파란색
            value: Number(state.measurement.emotionResult.Sad),
        },
        {
            label: "Surprised",
            emoji: "😮",
            color: "#f97316", // 주황색
            value: Number(state.measurement.emotionResult.Surprised),
        },
    ];

    // Sample data for the HR chart
    // left : total score - get
    // get : scores. sum
    const chartData = [
        { browser: "left", scores: 1, fill: "#e2e8f0" },
        { browser: "get", scores: 14, fill: "#3b82f6" },
    ];

    const navigate = useNavigate();
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [email, setEmail] = useState("");
    const [layoutName, setLayoutName] = useState<"default" | "shift">(
        "default"
    );

    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };

    const handleChange = (input: string) => {
        setEmail(input);
    };

    const handleKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    return (
        <div className="min-h-screen bg-white p-4 flex flex-col gap-4 overflow-auto">
            {/* Logo */}
            <div className="p-4">
                <Image
                    src={Logo}
                    h="2vh"
                    mr="2vw"
                    onClick={() => navigate("/", { replace: true })}
                    className="mr-auto"
                />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-16">
                Diagnosis Result
            </h1>

            {/* User Profile */}
            <div className="flex flex-row gap-4 h-1/5">
                <Card className="bg-gray-100 w-1/3">
                    <CardContent className="flex flex-col items-center justify-center h-full pt-4">
                        {capturedImage == null && (
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat="image/png"
                                className="w-full h-full object-cover rounded"
                            />
                        )}
                        {/* 하단 UI 분기 */}
                        {capturedImage ? (
                            <>
                                {/* 캡처된 이미지 표시 */}
                                <img
                                    src={capturedImage}
                                    alt="Captured"
                                    className="w-full h-full object-cover rounded"
                                />
                                <button
                                    onClick={retakeImage}
                                    className="w-full mt-4 py-1 bg-white text-slate-400 opacity-90 text-lg shadow rounded"
                                >
                                    ↻
                                </button>
                            </>
                        ) : countdown !== null ? (
                            <div className="w-full mt-4 py-2 bg-blue-500 text-white text-center rounded">
                                {countdown}
                            </div>
                        ) : (
                            <button
                                onClick={() => setCountdown(5)}
                                className="w-full mt-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Start Capture
                            </button>
                        )}
                    </CardContent>
                </Card>

                {/* Description Summary */}
                <Card className="bg-blue-50 w-2/3">
                    <CardContent className="flex flex-row justify-between items-center p-4 ">
                        <div className="flex flex-col w-1/2 h-full">
                            <ChartContainer
                                config={chartConfig}
                                className="aspect-square w-auto"
                            >
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        dataKey="scores"
                                        nameKey="browser"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (
                                                    viewBox &&
                                                    "cx" in viewBox &&
                                                    "cy" in viewBox
                                                ) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-2xl font-bold"
                                                            >
                                                                {`${score}`}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={
                                                                    (viewBox.cy ||
                                                                        0) + 24
                                                                }
                                                                className="fill-muted-foreground"
                                                            >
                                                                Score
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <h3 className="font-bold text-xl mb-4">
                                {" "}
                                {state.diagnosisType} Diagnosis Result
                            </h3>
                            <h4>Normal</h4>
                            <p>
                                If the issues you are experiencing persist, it
                                is recommended to seek free counseling at your
                                local mental health center or visit a
                                psychiatric clinic for consultation.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* HR and HRV Charts */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-bold mb-4">HR</h3>
                        <ChartContainer
                            config={{
                                value: {
                                    label: "Heart Rate",
                                    color: "#3b82f6",
                                },
                            }}
                            className="w-full h-[200px]"
                        >
                            <AreaChart data={hrData}>
                                <defs>
                                    <linearGradient
                                        id="hrGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#3b82f6"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="var(--color-value)"
                                    fill="url(#hrGradient)"
                                />
                            </AreaChart>
                        </ChartContainer>
                        <div className="mt-2 flex justify-start gap-2 text-sm text-muted-foreground">
                            <span>Min: {hrValuesMin}</span>
                            <span>Max: {hrValuesMax}</span>
                            <span>Mean: {hrValuesMean}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col p-4">
                        <h3 className="font-bold mb-10">HRV</h3>
                        <div className="flex flex-row items-center justify-center mb-4 px-10">
                            <Image src={HeartBeat} className="w-1/2" />
                            <span className="w-1/2 text-8xl font-bold text-blue-500 text-center">
                                {state.measurement.hrv}
                            </span>
                        </div>
                        <span className="text-sm text-slate-400 text-center">
                            HRV (Heart Rate Variability) is the variation in
                            time intervals
                            <br /> between consecutive heartbeats.
                        </span>
                    </CardContent>
                </Card>
            </div>

            {/* Emotion */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-bold mb-4">Emotion</h3>
                        <div className="space-y-2">
                            {emotions.map((emotion, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    {/* change to emoji (image) */}
                                    <div className="flex justify-between w-1/4">
                                        <span className="font-bold">
                                            {emotion.label}
                                        </span>
                                        <span className="text-xl">
                                            {emotion.emoji}
                                        </span>
                                    </div>
                                    <div className="w-3/4">
                                        <div
                                            className="h-8 rounded-md "
                                            style={{
                                                width:
                                                    emotion.value <= 0.03
                                                        ? "1%"
                                                        : `${Math.round(
                                                              emotion.value *
                                                                  100
                                                          )}%`,
                                                backgroundColor: emotion.color,
                                            }}
                                        >
                                            <div className="flex justify-end items-center h-full pr-1 text-white text-xs font-bold">
                                                {emotion.value == 0
                                                    ? ""
                                                    : `${Math.round(
                                                          emotion.value * 100
                                                      )}%`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Stress Gauge */}
                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-bold mb-12">STRESS</h3>
                        <div className="relative">
                            {/* Indicator */}
                            <div
                                className="absolute -top-3 transform -translate-x-1/2 text-blue-500"
                                style={{ left: `${state.measurement.stress}%` }} // Adjust this value based on the actual stress score
                            >
                                ▼
                            </div>
                            {/* Bar */}
                            <div className="flex justify-center items-center h-10 bg-gradient-to-r  from-blue-100 via-blue-300 to-blue-500 rounded-md">
                                <p className="text-2xl text-center font-bold text-white">
                                    score : {state.measurement.stress}
                                </p>
                            </div>
                        </div>
                        <p className="text-lg text-center mt-10">
                            Your stress level is low.
                            <br />
                            You’re having a calm and peaceful day! 😊
                        </p>
                    </CardContent>
                </Card>
            </div>
            {/* Action Buttons */}
            <Button
                w="100%"
                bg={palettes.primary}
                color="white"
                fontSize="3xl"
                fontWeight="bold"
                p={8}
                onClick={() => {
                    setShowKeyboard(true);
                }}
            >
                Save
            </Button>
            {showKeyboard && (
                <div className="mb-96">
                    <Input
                        type="email"
                        value={email}
                        placeholder="Email"
                        className="h-14 mb-4"
                        onClick={() => {
                            myRef.current?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                    />
                    <Keyboard
                        layoutName={layoutName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            )}
            <span ref={myRef} className="h-1" />
        </div>
    );
}
