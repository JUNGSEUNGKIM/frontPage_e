import English1 from "@/assets/audio/english_1.mp3";
import English2 from "@/assets/audio/english_2.mp3";

export const greetings = [
    "Welcome!\nReady for a new experience? ",
    "Hi there!\nLet’s begin your health journey. ",
    "Look here to start\nyour personal check-up! ",
    "Let us see your smile to begin! ",
    "Your well-being is our focus.\nLet’s begin!",
];

export interface Greeting {
    text: string;
    url: string;
}

export const Greetings = [
    {
        text: "Let us see your smile to begin!",
        url: English1,
    },
    {
        text: "Welcome!\nReady for a new experience?",
        url: English2,
    },
    { text: "Your well-being is our focus.\nLet’s begin!", url: "" },

    // French greeting
    {
        text: "Bienvenue!\nPrêt à découvrir votre santé autrement?",
        url: "",
    },
    // chinese
    {
        text: "你好！\n只需微笑，即刻开始健康体验！",
        url: "",
    },
];

// 애기 목소리, 공격적이지 않은 목소리
