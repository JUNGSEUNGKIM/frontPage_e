import { useTabStore } from "@/shared/stores/tabStore";
import BottomNavigationButton from "./BottomNavigationButton";

export default function BottomNavigator() {
    const currentTab = useTabStore((state) => state.currentTab);
    const changeTab = useTabStore((state) => state.changeTab);
    // 구조분해할당 시 에러
    // const [currentTab, changeTab] = useTabStore((state) => [
    //     state.currentTab,
    //     state.changeTab,
    // ]);

    return (
        <div className="w-full h-1/6 flex flex-row items-center justify-between rounded-t-3xl bg-white shadow-2xl px-72">
            <BottomNavigationButton
                label="Diagnosis"
                isSelected={currentTab === "diagnosis"}
                onClick={() => {
                    changeTab("diagnosis");
                }}
                tabIconType="search"
            />
            <BottomNavigationButton
                label="DTx"
                isSelected={currentTab === "dtx"}
                onClick={() => {
                    changeTab("dtx");
                }}
                tabIconType="dtx"
            />
            <BottomNavigationButton
                label="AI Chat"
                isSelected={currentTab === "chat"}
                onClick={() => {
                    changeTab("chat");
                }}
                tabIconType="aichat"
            />
        </div>
    );
}
