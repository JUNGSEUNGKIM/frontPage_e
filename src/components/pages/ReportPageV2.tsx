import {
    Area,
    AreaChart,
    Label,
    Line,
    LineChart,
    Pie,
    PieChart,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Image } from "@chakra-ui/react";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Logo from "@/assets/logo.png";
import palettes from "@/constants/colors";
import HeartBeat from "@/assets/heartbeat.png";

// Sample data for the HR chart
const hrData = [
    { time: "0", value: 65 },
    { time: "1", value: 72 },
    { time: "2", value: 64 },
    { time: "3", value: 75 },
    { time: "4", value: 69 },
    { time: "5", value: 84 },
];
// "Angry": 0,
// "Disgusted": 0,
// "Fearful": 0,
// "Happy": 0,
// "Neutral": 0,
// "Sad": 0,
// "Surprised": 0

const emotions = [
    { label: "Angry", emoji: "😡", color: "#90EE90", value: 0.4 },
    { label: "Disgusted", emoji: "😫", color: "#90EE90", value: 0.4 },
    { label: "Fearful", emoji: "😨", color: "#D3D3D3", value: 0.6 },
    { label: "Happy", emoji: "😄", color: "#00BFFF", value: 0.3 },
    { label: "Neutral", emoji: "🙂", color: "#FF6B6B", value: 0.1 },
    { label: "Sad", emoji: "😢", color: "#FFD700", value: 0.5 },
    { label: "Surprised", emoji: "😮", color: "#FFD700", value: 0.5 },
];
const chartData = [
    { browser: "safari", visitors: 90, fill: "var(--color-safari)" },
    { browser: "chrome", visitors: 10, fill: "var(--color-chrome)" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function DiagnosisResult() {
    return (
        <div
            className="min-h-screen bg-white p-4 flex flex-col gap-4"
            style={{ width: "100vw", height: "100vh" }}
        >
            {/* Logo */}
            <div className="p-4">
                <Image src={Logo} h="2vh" mr="2vw" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-16">
                Diagnosis Result
            </h1>

            {/* User Profile */}
            <div className="flex flex-row gap-4 h-1/5">
                <Card className="bg-gray-100 w-1/3">
                    <CardContent>
                        <div>User Image here</div>
                    </CardContent>
                </Card>

                {/* Description Summary */}
                <Card className="bg-blue-50 w-2/3">
                    <CardContent className="flex flex-row justify-between p-4 ">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-square w-1/3"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="visitors"
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
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {"none"}
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
                        {/* <div className="w-1/2">
                            <h3 className="font-bold">Diagnosis Result</h3>
                            <p>
                                Lorem ipsum dollar sit Lorem ipsum dollar
                                sitLorem ipsum dollar sitLorem ipsum dollar
                                sitLorem ipsum dollar sitLorem ipsum dollar
                            </p>
                        </div> */}
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
                                    color: "hsl(var(--chart-2))",
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
                                            stopColor="hsl(var(--chart-2))"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="hsl(var(--chart-2))"
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
                            <span>Min: 64</span>
                            <span>Max: 84</span>
                            <span>Mean: 74</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex flex-col p-4">
                        <h3 className="font-bold mb-10">HRV</h3>
                        <div className="flex flex-row items-center justify-center mb-4">
                            <Image src={HeartBeat} className="w-1/2" />
                            <span className="w-1/2 text-8xl font-bold text-blue-500 text-center">
                                79
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
                                    <div className="flex justify-between w-32">
                                        <span className="font-bold">
                                            {emotion.label}
                                        </span>
                                        <span className="text-xl">
                                            {emotion.emoji}
                                        </span>
                                    </div>
                                    <div
                                        className="h-8 rounded-md"
                                        style={{
                                            width: `${emotion.value * 100}%`,
                                            backgroundColor: emotion.color,
                                        }}
                                    >
                                        <div className="flex justify-end items-center h-full pr-2 text-white">
                                            {emotion.value * 100}%
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
                                style={{ left: `${20}%` }} // Adjust this value based on the actual stress score
                            >
                                ▼
                            </div>
                            {/* Bar */}
                            <div className="flex justify-center items-center h-10 bg-gradient-to-r  from-blue-100 via-blue-300 to-blue-500 rounded-md">
                                <p className="text-2xl text-center font-bold text-white">
                                    score : 20
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
            <div className="mb-28 mt-16 space-y-4">
                <Button
                    w="100%"
                    bg={palettes.primary}
                    color="white"
                    fontSize="2xl"
                    p={8}
                    onClick={() => print()}
                >
                    Print
                </Button>
                <Button
                    w="100%"
                    borderColor={palettes.grey}
                    borderWidth={1}
                    fontSize="2xl"
                    p={8}
                >
                    Quit
                </Button>
            </div>
        </div>
    );
}
