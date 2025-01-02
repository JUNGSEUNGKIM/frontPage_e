import { Area, AreaChart, Line, LineChart } from "recharts";

import { Button } from "@/components/ui/button";
import { Image } from "@chakra-ui/react";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Logo from "@/assets/logo.png";
import palettes from "@/constants/colors";

// Sample data for the HR chart
const hrData = [
    { time: "0min", value: 65 },
    { time: "1min", value: 72 },
    { time: "2min", value: 64 },
    { time: "3min", value: 75 },
    { time: "4min", value: 69 },
    { time: "5min", value: 84 },
];

// Sample data for the HRV chart
const hrvData = [
    { time: "0s", value: 50 },
    { time: "1s", value: 80 },
    { time: "2s", value: 40 },
    { time: "3s", value: 70 },
    { time: "4s", value: 90 },
    { time: "5s", value: 60 },
];

const emotions = [
    { emoji: "😊", color: "#FFD700", value: "00" },
    { emoji: "😄", color: "#00BFFF", value: "00" },
    { emoji: "❤️", color: "#FF6B6B", value: "00" },
    { emoji: "😌", color: "#90EE90", value: "00" },
    { emoji: "😐", color: "#D3D3D3", value: "00" },
];

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
            <h1 className="text-4xl font-bold text-center mb-4">
                Diagnosis Result
            </h1>

            {/* User Profile */}
            <div className="flex flex-row gap-4 h-1/5">
                <Card className="bg-gray-100 w-1/3">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="bg-gray-300 rounded-full p-4"></div>
                        <div>
                            <h2 className="text-2xl font-bold">User Name</h2>
                            <p className="text-gray-600">User information</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Description Summary */}
                <Card className="bg-blue-50 w-2/3">
                    <CardContent className="flex justify-between items-center p-6">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">
                                Description summary here
                            </h3>
                            <p className="text-gray-600">
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                                Description text below. Lorem Ipsum dollar sit
                            </p>
                        </div>
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-5xl font-bold text-blue-400">
                                    50
                                </div>
                            </div>
                            <div className="absolute inset-0 border-4 border-blue-200 rounded-full border-t-blue-400 rotate-45" />
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
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[200px]"
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
                                            stopColor="hsl(var(--chart-1))"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="hsl(var(--chart-1))"
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
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                            </AreaChart>
                        </ChartContainer>
                        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                            <span>min: 64</span>
                            <span>max: 84</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-bold mb-4">HRV</h3>
                        <div className="flex items-center justify-between">
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Heart Rate Variability",
                                        color: "hsl(var(--chart-2))",
                                    },
                                }}
                                className="h-[100px] flex-1"
                            >
                                <LineChart data={hrvData}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="var(--color-value)"
                                        dot={false}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                </LineChart>
                            </ChartContainer>
                            <span className="text-4xl font-bold text-blue-500 ml-4">
                                79
                            </span>
                        </div>
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
                                    <span className="text-xl">
                                        {emotion.emoji}
                                    </span>
                                    <div
                                        className="flex-1 h-8 rounded-full"
                                        style={{
                                            backgroundColor: emotion.color,
                                        }}
                                    >
                                        <div className="flex justify-end items-center h-full pr-2 text-white">
                                            {emotion.value}%
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
                        <h3 className="font-bold mb-4">STRESS</h3>
                        <div className="relative h-32">
                            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 rounded-full" />
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                                <p className="text-sm">description</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="mb-28 mt-auto space-y-4">
                <Button
                    w="100%"
                    bg={palettes.primary}
                    color="white"
                    variant="outline"
                    fontSize="2xl"
                    p={8}
                >
                    Print
                </Button>
                <Button
                    w="100%"
                    borderColor={palettes.grey}
                    borderWidth={1}
                    variant="outline"
                    fontSize="2xl"
                    p={8}
                >
                    Quit
                </Button>
            </div>
        </div>
    );
}
