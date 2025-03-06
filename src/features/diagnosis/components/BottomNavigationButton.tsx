import { cn } from "@/lib/utils";
import { TabIconType } from "../types";

interface BottomNavigationButtonProps {
    label: string;
    tabIconType: TabIconType;
    isSelected: boolean;
    onClick: () => void;
}

export default function BottomNavigationButton({
    label,
    tabIconType,
    isSelected,
    onClick,
}: BottomNavigationButtonProps) {
    const unselectedClassNames = "text-slate-300";
    const selectedClassNames = "text-blue-500";
    const selectionMarkerBarSize = "w-24 h-2";
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-between h-full ${
                isSelected ? selectedClassNames : unselectedClassNames
            }`}
        >
            <div className={selectionMarkerBarSize}/>
            <div className="flex flex-col items-center">
                {tabIconType === "search" && <SearchIcon />}
                {tabIconType === "dtx" && <DtxIcon />}
                {tabIconType === "aichat" && <AIChatIcon />}
                <p>{label}</p>
            </div>
            <div className={cn(selectionMarkerBarSize, isSelected ? "bg-blue-500" : "bg-white")}/>
        </button>
    );
}

// icons

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
        </svg>
    );
}

function AIChatIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
        </svg>
    );
}

function DtxIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
        </svg>
    );
}
