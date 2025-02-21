import { useDiagnosisStore } from "@/shared/stores/diagnosisStore";

export default function DiagnosisProgressToolBar({
    selectedIdx,
}: {
    selectedIdx: number | null;
}) {
    const { surveyState, answerQuestion, goPrevious, init } =
        useDiagnosisStore();

    // submit function (go to next question)
    function handleSubmit() {
        if (selectedIdx != null) {
            answerQuestion(selectedIdx);
        } else {
            // show something?
        }
    }

    function handleGoPrevious() {
        goPrevious();
    }

    function handleInit() {
        init();
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
            className="size-24"
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
            className="size-24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}

function StopIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
            />
        </svg>
    );
}
