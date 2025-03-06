import whiteLogo from "@/assets/logo_white.png";
import { useTabStore } from "@/shared/stores/tabStore";
import AIChatIcon from "@/assets/icons/aichat.svg";
import DiagnosisIcon from "@/assets/icons/diagnosis.svg";
import DTXIcon from "@/assets/icons/dtx.svg";
import AIChatSelectedIcon from "@/assets/icons/aichat_selected.svg";
import DiagnosisSelectedIcon from "@/assets/icons/diagnosis_selected.svg";
import DTXSelectedIcon from "@/assets/icons/dtx_selected.svg";
import HRIcon from "@/assets/hr.png";
import HRVIcon from "@/assets/hrv.png";
import StressIcon from "@/assets/stress.png";
import { Tab } from "@/shared/types/tab";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { RPPGMeasurement } from "@/types";
import { useNavigate } from "react-router";
import { CameraFlipButton } from "./CameraFlipButton";

interface LSDiagnosisSidebarProps {
    children: ReactNode;
    measurementValue: RPPGMeasurement;
}

export default function DiagnosisSidebar({
    children,
    measurementValue,
}: LSDiagnosisSidebarProps) {

    return (
        <div
            className="w-1/3 h-screen bg-blue-500 flex"
            style={{
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
            }}
        >
            {/* Tab 선택용 사이드바 */}
            <TabBar />

            <div className="w-4/5 flex flex-col gap-10 p-12 pb-24">
                {/* Camera */}
                <div className="rounded-2xl overflow-clip h-[50%] flex justify-end">
                    <div className="w-full h-full rounded-2xl overflow-clip flex justify-center items-center bg-black">
                        {children}
                    </div>

                    <CameraFlipButton />
                </div>

                {/* rPPG 데이터 전시 카드들 */}
                <RPPGCards measurementValue={measurementValue} />
            </div>
        </div>
    );
}

function RPPGCards({
    measurementValue,
}: {
    measurementValue: RPPGMeasurement;
}) {
    const [t] = useTranslation();

    // Div styles
    const columnWrapperStyle = "flex flex-col w-full h-full gap-3";
    const shadowStyle = { boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)" };
    const cardStyle =
        "w-full bg-[#99C0FF] flex flex-col items-center justify-between rounded-2xl p-4";
    const iconAndTextWrapperStyle = "flex items-center justify-center w-full h-full";

    // Text & icon styles
    const labelTextStyle = "text-xl text-gray-700 font-medium";
    const iconStyle = "w-14 h-14 object-cover";
    const valueTextStyle = "text-3xl font-semibold flex items-end pl-2";

    const isValueLoading = (value: string): boolean => {
        return value.length === 0 || value.indexOf('-') > -1
    }

    return (
        <div className="flex h-full gap-3">
            <div className={columnWrapperStyle}>
                {/* Emotion */}
                <div className={cn(cardStyle, "h-3/5")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>{t("rppgEmotionLabel")}</h3>
                    <p className="text-3xl font-semibold">{measurementValue.emotion}</p>
                    <div />
                </div>

                {/* HRV */}
                <div className={cn(cardStyle, "h-2/5")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>HRV</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <div className="w-1/2 flex justify-end">
                            <img src={HRVIcon} className={iconStyle} />
                        </div>
                        <div className="w-1/2 flex justify-start items-end">
                            <p className={valueTextStyle}>
                                {measurementValue.hrv}
                            </p>
                            {!isValueLoading(measurementValue.hrv) && <p className="pl-2 text-sm">ms</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={columnWrapperStyle}>
                {/* HR */}
                <div className={cn(cardStyle, "h-2/5")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>HR</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <div className="w-1/2 flex justify-end">
                            <img src={HRIcon} className={iconStyle} />
                        </div>
                        <div className="w-1/2 flex justify-start items-end">
                            <p className={valueTextStyle}>
                                {measurementValue.hr}
                            </p>
                            {!isValueLoading(measurementValue.hr) && <p className="pl-2 text-sm">bpm</p>}
                        </div>
                    </div>
                </div>

                {/* Stress */}
                <div className={cn(cardStyle, "h-3/5")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>{t("rppgStressLabel")}</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <div className="w-full flex justify-end">
                            <img src={StressIcon} className={iconStyle} />
                        </div>
                        <p className={cn(valueTextStyle, "w-full")}>
                            {measurementValue.stress}
                        </p>
                    </div>
                    <div />
                </div>
            </div>
        </div>
    );
}

function TabBar() {
    const [t] = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="w-1/5 h-full flex flex-col items-end">
            {/* Logo */}
            <button className="flex mr-1 mt-7 mb-8 w-[78%]"
                onClick={() => navigate("/onboarding")}
            >
                <img src={whiteLogo} alt="Emma Healthcare Logo" />
            </button>

            {/* 흰색 sidebar tab */}
            <div
                className="w-full h-[60%] bg-white flex flex-col items-center justify-center"
                style={{
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                }}
            >
                {/* Tab 선택 버튼 */}
                <div className="w-full flex flex-col items-center justify-center gap-16">
                    <TabBarButton
                        tab="diagnosis"
                        icon={DiagnosisIcon}
                        selectedIcon={DiagnosisSelectedIcon}
                        label={t("tapBtnDiagnosis")}
                    />
                    <TabBarButton
                        tab="dtx"
                        icon={DTXIcon}
                        selectedIcon={DTXSelectedIcon}
                        label={t("tapBtnDtx")}
                    />
                    <TabBarButton
                        tab="chat"
                        icon={AIChatIcon}
                        selectedIcon={AIChatSelectedIcon}
                        label={t("tapAIChat")}
                    />
                </div>
            </div>
        </div>
    );
}

interface TabBarButtonProps {
    tab: Tab;
    icon: string;
    selectedIcon: string;
    label: string;
}

function TabBarButton({ tab, icon, selectedIcon, label }: TabBarButtonProps) {
    const currentTab = useTabStore((state) => state.currentTab);
    const changeTab = useTabStore((state) => state.changeTab);

    const buttonStyle = "flex flex-col items-center justify-center gap-4";
    const iconStyle = "w-12";
    const selectionIndicatorStyle = "w-[12px] h-full";

    return (
        <button
            className="w-full flex items-center justify-between"
            onClick={() => {
                changeTab(tab);
            }}
        >
            <div />
            {currentTab === tab ? (
                <>
                    <div className={cn(buttonStyle, "text-blue-500")}>
                        <img src={selectedIcon} className={iconStyle} />
                        {label}
                    </div>
                    <div
                        className={cn(selectionIndicatorStyle, "bg-blue-500")}
                    />
                </>
            ) : (
                <>
                    <div className={cn(buttonStyle, "text-gray-300")}>
                        <img src={icon} className={iconStyle} />
                        {label}
                    </div>
                    <div className={selectionIndicatorStyle} />
                </>
            )}
        </button>
    );
}
