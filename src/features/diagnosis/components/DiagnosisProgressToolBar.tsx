import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

export default function DiagnosisProgressToolBar({
    selectedIdx,
}: {
    selectedIdx: number | null;
}) {
    const { surveyState, answerQuestion, goPrevious } = useDiagnosisStore();

    // submit function (go to next question)
    function handleSubmit() {
        console.log("submit");
        if (selectedIdx != null) {
            answerQuestion(selectedIdx);
        } else {
            // show something?
        }
    }

    function handleGoPrevious() {
        goPrevious();
    }

    const enabledClassName = "text-blue-500";
    const disabledClassName = "text-slate-300";

    return (
        <div className="w-full flex flex-row justify-between">
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
            <button
                onClick={handleSubmit}
                className={`${
                    selectedIdx == null ? disabledClassName : enabledClassName
                }`}
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
}

function ChevronLeftIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-14"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-14"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}
