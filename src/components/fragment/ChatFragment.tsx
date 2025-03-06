import Emoji from "@/assets/animations/thinking.png";
import PrimaryButton from "@/shared/components/PrimaryButton";
export default function ChatFragment() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
            <div className="h-20" />
            <img src={Emoji} className="w-64" />
            <p className="font-bold text-3xl animate-pulse">
                음성으로 AI의사와 자유로운 상담을 나눠보세요
            </p>
            <div className="h-20" />
            <PrimaryButton
                label="개발이 진행 중이에요."
                disabled
                onClick={() => {}}
            />
        </div>
    );
}
