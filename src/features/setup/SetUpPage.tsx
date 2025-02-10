import { useScreenStore } from "@/shared/stores/screenStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function SetUpPage() {
    const navigate = useNavigate();
    const { update } = useScreenStore();

    // rendering => check screen ration => set ScreenStore
    useEffect(() => {
        const { innerWidth: width, innerHeight: height } = window;
        if (width > height) {
            update(true);
        }

        setTimeout(() => {
            navigate("/onboarding");
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
            <SpinnerIcon />
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
            className="animate-spin text-blue-500 w-40 h-40"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
