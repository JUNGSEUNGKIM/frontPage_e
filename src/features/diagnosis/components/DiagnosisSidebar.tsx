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

export default function DiagnosisSidebar() {

    return (
        <div 
            className="w-[30%] h-screen bg-blue-500 flex"
            style={{
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
            }}
        >

            {/* Tab 선택용 사이드바 */}
            <TabBar />


            <div className="w-4/5 flex flex-col gap-10 p-12 pb-24">

                {/* Camera */}
                <div className="rounded-full bg-white w-[19vw] h-[19vw]">
                    <img src="https://picsum.photos/600/600" className="rounded-full w-full h-full object-cover" />
                </div>

                {/* rPPG 데이터 전시 카드들 */}
                <RPPGCards />

            </div>
        </div>
    );
}

function RPPGCards() {

    const [t] = useTranslation();

    // Div styles
    const columnWrapperStyle = "flex flex-col w-full h-full gap-3";
    const shadowStyle = {boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)"};
    const cardStyle = "w-full bg-[#99C0FF] flex flex-col items-center justify-center rounded-2xl";
    const iconAndTextWrapperStyle = "flex items-center justify-center gap-4";

    // Text & icon styles
    const labelTextStyle = "text-xl text-gray-700 font-medium";
    const valueTextStyle = "text-3xl font-semibold";
    const iconStyle = "w-16 h-16 object-cover"

    return (
        <div className="flex w-[20vw] h-full gap-3">
            <div className={columnWrapperStyle}>

                {/* Emotion */}
                <div className={cn(cardStyle, "h-3/5 gap-16")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>{t("rppgEmotionLabel")}</h3>
                    <p className={valueTextStyle}>{t("emotionNeutralLabel")}</p>
                    <div/>
                </div>

                {/* HRV */}
                <div className={cn(cardStyle, "h-2/5 gap-4")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>HRV</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <img src={HRVIcon} className={iconStyle}/>
                        <p className={valueTextStyle}>0</p>
                    </div>
                </div>

            </div>
            <div className={columnWrapperStyle}>

                {/* HR */}
                <div className={cn(cardStyle, "h-2/5 gap-4")}style={shadowStyle}>
                    <h3 className={labelTextStyle}>HR</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <img src={HRIcon} className={iconStyle}/>
                        <p className={valueTextStyle}>0</p>
                    </div>
                </div>

                {/* Stress */}
                <div className={cn(cardStyle, "h-3/5 gap-12")} style={shadowStyle}>
                    <h3 className={labelTextStyle}>{t("rppgStressLabel")}</h3>
                    <div className={iconAndTextWrapperStyle}>
                        <img src={StressIcon} className={iconStyle}/>
                        <p className={valueTextStyle}>0</p>
                    </div>
                    <div/>
                </div>

            </div>
        </div>
    )
}

function TabBar() {
    const [t] = useTranslation();

    return (
        <div className="w-1/5 h-full flex flex-col items-end">

            {/* Logo */}
            <div className="flex mr-1 mt-7 mb-8 w-[78%]">
                <img src={whiteLogo} alt="Emma Healthcare Logo"/>
            </div>

            {/* 흰색 sidebar tab */}
            <div
                className="w-full h-[640px] bg-white flex flex-col items-center justify-center"
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
    tab: Tab,
    icon: string,
    selectedIcon: string,
    label: string,
}

function TabBarButton({tab, icon, selectedIcon, label}: TabBarButtonProps) {
    const currentTab = useTabStore((state) => state.currentTab);
    const changeTab = useTabStore((state) => state.changeTab);

    return (
        <button
            className="w-full flex items-center justify-between"
            onClick={() => {
                changeTab(tab);
            }}
            >
            <div/>
            {currentTab === tab ? 
                <>
                    <div className="flex flex-col items-center justify-center gap-4 text-blue-500">
                        <img src={selectedIcon}/>
                        {label}
                    </div>
                    <div className="w-[12px] h-full bg-blue-500"/>
                </>
                :
                <>
                    <div className="flex flex-col items-center justify-center gap-4 text-gray-300">
                        <img src={icon}/>
                        {label}
                    </div>
                    <div className="w-[12px] h-full"/>
                </>
            }                        
        </button>
    );
}