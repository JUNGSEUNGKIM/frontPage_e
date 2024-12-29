/// Greetings for Onboarding Page

import English1 from "@/assets/audio/english_1.mp3";
import English2 from "@/assets/audio/english_2.mp3";
import English3 from "@/assets/audio/english_3.mp3";
import English4 from "@/assets/audio/english_4.mp3";
import English5 from "@/assets/audio/english_5.mp3";
import French1 from "@/assets/audio/french_1.mp3";
import Chinese1 from "@/assets/audio/chinese_1.mp3";

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
    {
        text: "Your well-being is our focus.\nLet’s begin!",
        url: English3,
    },
    {
        text: "Can you give me a big smile?\nThat’s how we’ll start!",
        url: English4,
    },
    {
        text: "Hi there! I’m so happy to see you!\nLet’s check your health together!",
        url: English5,
    },

    // French greeting
    {
        text: "Bienvenue!\nPrêt à découvrir votre santé autrement?",
        url: French1,
    },
    // chinese
    {
        text: "你好！\n只需微笑，即刻开始健康体验！",
        url: Chinese1,
    },
];

// 애기 목소리, 공격적이지 않은 목소리
