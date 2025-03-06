import { ChevronLeftIcon } from "@/assets/icons/chevron_left";
import { ChevronRightIcon } from "@/assets/icons/chevron_right";
import { StopIcon } from "@/assets/icons/stop";
import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";
import { useModalStore } from "@/shared/stores/modalStore";

export default function DiagnosisProgressToolBar({
    selectedIdx,
    answerValue,
    isSkippable = false,
    skipDefaultValue = "",
    skipQuestionCount = 0,
}: {
    selectedIdx?: number | null;
    answerValue?: string | null;
    isSkippable?: boolean;
    skipDefaultValue?: string;
    skipQuestionCount?: number;
}) {
    const { surveyState, answerQuestion, goPrevious } = useDiagnosisStore();

    const { showModal } = useModalStore();

    // submit function (go to next question)
    function handleSubmit() {
        if (selectedIdx != null) {
            answerQuestion(selectedIdx);
        } else if (answerValue) {
            answerQuestion(answerValue);
        } else if (isSkippable && skipDefaultValue) {
            answerQuestion(skipDefaultValue);
        } else {
            // show something?
        }

        for (let i = 0; i < skipQuestionCount; i++) {
            answerQuestion(skipDefaultValue);
        }
    }

    function handleGoPrevious() {
        goPrevious();
    }

    //stop
    function handleInit() {
        showModal();
    }

    function isValidAnswerSubmitted() {
        return selectedIdx != null || (answerValue && answerValue.length > 0) || isSkippable
    }

    const enabledClassName = "text-blue-500";
    const disabledClassName = "text-slate-300";

    return (
        <div className="w-full flex flex-row justify-center gap-64 px-28">
            <button
                onClick={handleGoPrevious}
                className={`${
                    surveyState.currentIndex == 0
                        ? disabledClassName
                        : enabledClassName
                }`}
            >
                <ChevronLeftIcon />
            </button>
            <button onClick={handleInit} className={"text-blue-500"}>
                <StopIcon />
            </button>
            <button
                onClick={handleSubmit}
                className={`${
                    isValidAnswerSubmitted() ? enabledClassName : disabledClassName
                }`}
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
}
