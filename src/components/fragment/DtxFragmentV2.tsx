import { Api, ApiKeys } from "@/constants/api";
import { DTxInfo, DTxProvider, DTxType, useDTx } from "@/providers/dtx";
import { ReactNode, useEffect, useState, useRef } from "react";
import HeadPhoneEmoji from "@/assets/animations/headphone.png";
// TODO: 1. create loading component
// TODO: 2. create interface for api call using axios
// TODO: 3. connect lucid website to iframe
// TODO: 4. handling error status

const DtxFragmentV2 = () => {
    const dtxState = useState<DTxInfo>({
        status: "loading",
        selectedType: "lucid",
    });

    const uuidRef = useRef("");

    // call when init state
    useEffect(() => {
        const fetchUuid = async () => {
            setTimeout(async () => {
                const data = await fetch(Api.lucidToken, {
                    method: "POST",
                    headers: {
                        "api-key": ApiKeys.lucidLicense,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        modeId: "emma",
                        contentLibraryId: "immersive",
                        desiredTime: 5,
                        participantId: "emma-tester",
                    }),
                });

                const json = await data.json();
                // console.log(json["_id"]);
                if (json) {
                    uuidRef.current = json["_id"];
                }

                dtxState[1]({ ...dtxState[0], status: "done" });
            }, 3000);
        };
        fetchUuid();
    }, []);

    return (
        <DTxProvider dtx={dtxState}>
            <div className="w-full h-full mt-4">
                {/* {dtxState[0].status === "init" && <DtxSelectFragment />} */}
                {dtxState[0].status === "loading" && <DTxLoading />}
                {dtxState[0].status === "done" && (
                    <DTxWrapper>
                        <LucidComponent uuid={uuidRef.current} />
                    </DTxWrapper>
                )}
                {dtxState[0].status === "error" && <div>Error</div>}
            </div>
        </DTxProvider>
    );
};

export default DtxFragmentV2;

const DtxSelectFragment = () => {
    const [dtx, setDtx] = useDTx();

    function handleBtnClick(value: DTxType) {
        setDtx({ ...dtx, selectedType: value });
    }

    return (
        <div className="w-full h-full mt-10 flex flex-col justify-between">
            <div className="w-full h-1/2">
                <h1 className="font-bold text-4xl mb-4">Select DTx</h1>
                <div className="flex flex-row gap-4 h-full">
                    <DTxSelectableButton
                        label="Lucid"
                        isSelected={dtx.selectedType === "lucid"}
                        onClick={() => handleBtnClick("lucid")}
                    />
                    <DTxSelectableButton
                        label="Game"
                        isSelected={dtx.selectedType === "game"}
                        onClick={() => handleBtnClick("game")}
                    />
                </div>
            </div>
            <button
                className="w-full p-6 bg-blue-500 rounded-md text-white font-bold text-3xl"
                onClick={() => {}}
            >
                Select
            </button>
        </div>
    );
};

const DTxLoading = () => {
    return (
        <div className="w-full h-1/2 flex flex-col items-center justify-center bg-blue-100 rounded-md gap-2">
            <img src={HeadPhoneEmoji} className="w-1/4 h-1/2"></img>
            <p className="animate-pulse text-blue-500 font-bold text-xl">
                Loading Lucid 101
            </p>
            <h1 className="font-bold text-center text-slate-800 text-2xl px-10">
                Lucid 101은 사용자의 감정에 어울리는 노래를 추천해주는 디지털
                치료제입니다.
                <br /> 마인드맵에서 현재 느끼는 감정을 선택해보세요.
            </h1>
        </div>
    );
};

const DTxSelectableButton = ({
    label,
    isSelected,
    onClick,
}: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
}) => {
    const common =
        "w-1/2 h-1/2 font-bold text-3xl rounded bg-white text-black ";
    const selectedClassNames =
        "bg-blue-300 border-blue-400 border-2 text-white";
    const unselectedClassNames = "text-black";

    return (
        <button
            className={
                isSelected
                    ? common + selectedClassNames
                    : common + unselectedClassNames
            }
            onClick={onClick}
        >
            {label}
        </button>
    );
};

const DTxWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full h-full mt-4 rounded-md bg-blue-100">
            {children}
        </div>
    );
};

const LucidComponent = ({ uuid }: { uuid: string }) => {
    return (
        <iframe src={Api.lucid + uuid} className="w-full h-full rounded-md" />
    );
};
