import { Button } from "@/components/ui/button";
import RocketEmoji from "@/assets/animations/rocket.png";
import LoadingEmoji from "@/assets/animations/loading.png";
import palettes from "@/constants/colors";
import { DiagnosisType, RPPGMeasurement } from "@/types";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// TODO: remove chakra ui

export default function DiagnosisDoneFragment({
    rppgMesurement,
    hrValues,
    selectedDiagnosisType,
    answers,
}: {
    rppgMesurement: RPPGMeasurement;
    hrValues: string[];
    selectedDiagnosisType: DiagnosisType;
    answers: number[];
}) {
    const [t] = useTranslation();

    const navigate = useNavigate();

    const isDone =
        rppgMesurement.hrv !== "0" &&
        rppgMesurement.hr !== "0" &&
        rppgMesurement.stress !== "0" &&
        hrValues.length > 5;

    function handleClick() {
        navigate("/report", {
            state: {
                measurement: rppgMesurement,
                hrValues: hrValues,
                score: answers.reduce((acc, current) => acc + current, 0),
                diagnosisType: selectedDiagnosisType,
            },
        });
    }

    return (
        <div className="w-full h-3/4 flex flex-col items-center justify-center bg-white rounded-lg gap-4">
            <img src={isDone ? RocketEmoji : LoadingEmoji} className="h-64" />
            <h1 className="h-20 text-center text-3xl font-bold">
                {isDone ? t("doneLabel") : t("waitingLabel")}
            </h1>
            {isDone && (
                <Button
                    w="40vw"
                    h="3vh"
                    mt="2vh"
                    bg={palettes.primary}
                    color="white"
                    fontWeight="medium"
                    fontSize="2xl"
                    loading={!isDone}
                    onClick={handleClick}
                    className="shadow-md"
                >
                    {t("btnLetsCheck")}
                </Button>
            )}
            {!isDone && (
                <Button
                    w="40vw"
                    h="3vh"
                    mt="2vh"
                    bg={palettes.primary}
                    color="white"
                    fontWeight="medium"
                    fontSize="2xl"
                    loading={true}
                    className="shadow-md"
                >
                    <SpinnerIcon />
                </Button>
            )}
        </div>
    );
}

function SpinnerIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="animate-spin"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
