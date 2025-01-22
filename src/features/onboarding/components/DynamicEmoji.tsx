import GrinningEmoji from "@/assets/animations/grinning.png";
import KissEmoji from "@/assets/animations/kiss.png";
import OpenMouthEmoji from "@/assets/animations/open_mouth.png";
import RelieveEmoji from "@/assets/animations/relieve.png";
import WinkingEmoji from "@/assets/animations/winking.png";
import { useTranslation } from "react-i18next";

// image list
const images = [
    GrinningEmoji,
    WinkingEmoji,
    KissEmoji,
    OpenMouthEmoji,
    RelieveEmoji,
    WinkingEmoji,
    GrinningEmoji,
    GrinningEmoji,
    GrinningEmoji,
];

export default function DynamicEmoji({ currentIdx }: { currentIdx: number }) {
    const [t] = useTranslation();

    const Greetings = [
        t("greeting1"),
        t("greeting2"),
        t("greeting3"),
        t("greeting4"),
        t("greeting5"),
    ];

    return (
        <div className="flex flex-col items-center">
            <img src={images[currentIdx]} className="w-80 h-80" />
            <h1
                className="min-h-48 mt-16 animated-pulse font-bold text-black 
                           px-3 text-7xl whitespace-pre-line text-center"
            >
                {Greetings[currentIdx]}
            </h1>
        </div>
    );
}
