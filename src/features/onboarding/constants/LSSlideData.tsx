import { LSSlideData } from "../types";
import Partying from "@/assets/animations/partying.png"
import Memo from "@/assets/animations/memo.png"
import Monocle from "@/assets/animations/monocle.png"
import Clip from "@/assets/animations/clip.png"
import Clown from "@/assets/animations/clown.png"
import Dotted from "@/assets/animations/dotted.png"
import ShadowBlue from "@/assets/shadows/shadow_blue.png"
import ShadowGreen from "@/assets/shadows/shadow_green.png"
import ShadowPink from "@/assets/shadows/shadow_pink.png"
import ShadowPurple from "@/assets/shadows/shadow_purple.png"
import ShadowMagenta from "@/assets/shadows/shadow_magenta.png"
import ShadowYellow from "@/assets/shadows/shadow_yellow.png"

export const slideData: Record<number, LSSlideData> = {
    0: {
        title: "welcomeLabel",
        description: "kioskInfoDescription",
        backgroundColorGradientTop: "#E9F8FF",
        backgroundColorGradientBottom: "#BBE9FF",
        borderColorGradientEdge: "#3B82F6",
        borderColorGradientMiddle: "#FFFFFF",
        image: Partying,
        shadow: ShadowBlue,
    },
    1: {
        title: "ComprehensiveDiagnosisLabel",
        description: "diagnosisInfoDescription",
        backgroundColorGradientTop: "#FFEEFF",
        backgroundColorGradientBottom: "#F8C9F8",
        borderColorGradientEdge: "#D272A1",
        borderColorGradientMiddle: "#FFFFFF",
        image: Memo,
        shadow: ShadowMagenta,
    },
    2: {
        title: "howToStartLabel",
        description: "howToStartDescription",
        backgroundColorGradientTop: "#FAFAFF",
        backgroundColorGradientBottom: "#A9A5DF",
        borderColorGradientEdge: "#451FAE",
        borderColorGradientMiddle: "#FFFFFF",
        image: Monocle,
        shadow: ShadowPurple,
    },
    3: {
        title: "checkYourResultsLabel",
        description: "checkYourResultDescription",
        backgroundColorGradientTop: "#FFECEC",
        backgroundColorGradientBottom: "#FED3D3",
        borderColorGradientEdge: "#DA0000",
        borderColorGradientMiddle: "#FFFFFF",
        image: Clip,
        shadow: ShadowPink,
    },
    4: {
        title: "disclaimerLabel",
        description: "disclaimerDescription",
        backgroundColorGradientTop: "#EAFFE3",
        backgroundColorGradientBottom: "#C6EBBA",
        borderColorGradientEdge: "#6BB553",
        borderColorGradientMiddle: "#FFFFFF",
        image: Clown,
        shadow: ShadowGreen,
    },
    5: {
        title: "cameraTipsLabel",
        description: "cameraTipsDescription",
        backgroundColorGradientTop: "#FFF4CE",
        backgroundColorGradientBottom: "#FFDE72",
        borderColorGradientEdge: "#BB9413",
        borderColorGradientMiddle: "#FFFFFF",
        image: Dotted,
        shadow: ShadowYellow,
    },
    6: {
        title: "startLabel",
        description: "",
        backgroundColorGradientTop: "#E3E9FF",
        backgroundColorGradientBottom: "#A1B4FF",
        borderColorGradientEdge: "#4460CF",
        borderColorGradientMiddle: "#FFFFFF",
        image: Partying,
        shadow: ShadowBlue,
    }
}