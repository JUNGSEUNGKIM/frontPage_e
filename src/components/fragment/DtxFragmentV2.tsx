import { useEffect, useState, useRef, ReactNode } from "react";
// TODO: 1. create loading component
// TODO: 2. create interface for api call using axios
// TODO: 3. connect lucid website to iframe
// TODO: 4. handling error status

// required status : init, loading, done ,error
type DTxStatus = "init" | "loading" | "done" | "error";

type DTxType = "lucid" | "game";

const DtxFragmentV2 = () => {
    const [status, setStatus] = useState<DTxStatus>("init");

    return (
        <div className="w-full h-full mt-4">
            {status === "init" && <DtxSelectFragment />}
            {status === "loading" && <div>Loading...</div>}
            {status === "done" && (
                <DTxWrapper>
                    <LucidComponent />
                </DTxWrapper>
            )}
            {status === "error" && <div>Error</div>}
        </div>
    );
};

export default DtxFragmentV2;

const DtxSelectFragment = () => {
    const [selectedDtx, setSelectedDtx] = useState<DTxType | null>(null);
    return (
        <div className="w-full mt-10">
            <h1 className="font-bold text-4xl mb-4">Select DTx</h1>
            <div className="flex flex-row gap-4">
                <DTxSelectableButton
                    label="Lucid"
                    isSelected={selectedDtx === "lucid"}
                />
                <DTxSelectableButton
                    label="Lucid"
                    isSelected={selectedDtx === "lucid"}
                />
            </div>
        </div>
    );
};

const DTxSelectableButton = ({
    label,
    isSelected,
}: {
    label: string;
    isSelected: boolean;
}) => {
    const common = "w-60 p-6 font-bold text-3xl rounded ";
    const selectedClassNames = "bg-blue-500 text-white";
    const unselectedClassNames = "bg-white text-black";

    return (
        <button
            className={
                isSelected
                    ? common + selectedClassNames
                    : common + unselectedClassNames
            }
        >
            {label}
        </button>
    );
};

const DTxWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-1/2 mt-4 rounded-md bg-slate-500">
            {children}
        </div>
    );
};

const LucidComponent = () => {
    return <iframe className="w-full h-1/2 bg-red"></iframe>;
};
