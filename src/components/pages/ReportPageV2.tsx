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
import { generatePDF } from "@/utls/pdf";

// screen capture

type DiagnosisResultStatus = "Normal" | "Warning" | "Danger";

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

    const stressText =
        Number(state.measurement.stress) <= 60
            ? "Your stress level is mild.\nYou’re experiencing occasional stress, but it’s manageable. Keep it up! 💪"
            : "Your stress level is high.\nYou might feel overwhelmed. Take a moment to pause and recharge! 🔋";

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
            color: "#facc15", // 노란색
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
    const maxScore = state.diagnosisType == "Dementia" ? 30 : 27;
    const chartData = [
        { browser: "left", scores: maxScore - state.score, fill: "#e2e8f0" },
        { browser: "get", scores: state.score, fill: "#3b82f6" },
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

    // Diagnosis Status
    // 기준 점수와 설명 정의
    const thresholds: Record<
        string,
        {
            normal: { score: number; description: string };
            warning: { score: number; description: string };
            danger: { score: number; description: string };
        }
    > = {
        Depression: {
            normal: {
                score: 10,
                description: `Your mental state appears to be stable. 😊 
                      Keep maintaining a healthy lifestyle and continue doing what brings you joy.
                      Remember, occasional stress is normal and part of life.`,
            },
            warning: {
                score: 20,
                description: `You might be experiencing mild signs of depression. 🤔
                      Consider talking to someone you trust or engaging in relaxing activities.
                      If symptoms persist, seeking professional guidance could be beneficial.`,
            },
            danger: {
                score: Infinity,
                description: `Your score indicates significant depressive symptoms. 🆘
                      Please reach out to a mental health professional for immediate support.
                      You don't have to face this alone—help is available, and recovery is possible.`,
            },
        },
        Dementia: {
            normal: {
                score: 5,
                description: `Your cognitive functions seem to be in good shape. 🙂
                      Keep engaging in brain-stimulating activities like reading, puzzles, or learning new skills.
                      Staying physically active and socially connected can also benefit your mental health.`,
            },
            warning: {
                score: 20,
                description: `There are some signs that may indicate cognitive decline. 🤔
                      It’s a good idea to monitor these changes and consult with a specialist if needed.
                      Early intervention can make a significant difference in managing symptoms effectively.`,
            },
            danger: {
                score: Infinity,
                description: `Your score suggests potential serious cognitive challenges. 🆘
                      Please consult a neurologist or specialist as soon as possible.
                      Early diagnosis and treatment are crucial for better management of the condition.`,
            },
        },
    };

    // Diagnosis Status 결정 함수
    function getDiagnosisResult(
        type: string,
        score: number
    ): { status: DiagnosisResultStatus; description: string } {
        const threshold = thresholds[type];
        if (!threshold) {
            throw new Error(`Unknown diagnosis type: ${type}`);
        }

        if (score < threshold.normal.score) {
            return {
                status: "Normal",
                description: threshold.normal.description,
            };
        } else if (score < threshold.warning.score) {
            return {
                status: "Warning",
                description: threshold.warning.description,
            };
        } else {
            return {
                status: "Danger",
                description: threshold.danger.description,
            };
        }
    }

    // 사용 예
    const diagnosisType = state.diagnosisType; // e.g., "Depression"
    const { status: diagnosisStatus, description: diagnosisDescription } =
        getDiagnosisResult(diagnosisType, score);

    return (
        <div
            id="capture"
            className="min-h-screen bg-white p-4 flex flex-col gap-4 overflow-auto"
        >
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
                                reversed={true}
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
                            <h3 className="font-bold text-xl">
                                {state.diagnosisType} Diagnosis Result
                            </h3>
                            <Card className="flex flex-row gap-4 bg-white px-2 rounded-md my-2">
                                <h4 className="font-bold">Status</h4>
                                {/* Conditional text here */}
                                <h4
                                    className={`font-bold ${
                                        diagnosisStatus === "Normal"
                                            ? "text-blue-500"
                                            : diagnosisStatus === "Warning"
                                            ? "text-orange-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {diagnosisStatus}
                                </h4>
                            </Card>
                            <p>{diagnosisDescription}</p>
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
                                                    emotion.value <= 0.08
                                                        ? "1%"
                                                        : `${Math.round(
                                                              emotion.value *
                                                                  100
                                                          )}%`,
                                                backgroundColor: emotion.color,
                                            }}
                                        >
                                            <div className="flex justify-end items-center h-full pr-1 text-white text-xs font-bold">
                                                {emotion.value <= 0.08
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
                                style={{
                                    left: `${state.measurement.stress}%`,
                                }} // Adjust this value based on the actual stress score
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
                            {stressText}
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
                    if (showKeyboard) {
                        setShowKeyboard(false);
                        setTimeout(() => {
                            generatePDF("capture", email);
                        }, 1000);
                    } else {
                        setShowKeyboard(true);
                    }
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
