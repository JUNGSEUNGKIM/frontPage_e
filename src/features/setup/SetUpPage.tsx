import { useEffect } from "react";
import { useNavigate } from "react-router";

/// 임시적으로 아무런 역할을 수행하진 않습니다.
/// 추후 초기화해야할 데이터가 생길 것 같아 남겨둡니다.

export default function SetUpPage() {
    const navigate = useNavigate();

    // rendering => check screen ration => set ScreenStore
    useEffect(() => {
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin text-blue-500 w-40 h-40"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
