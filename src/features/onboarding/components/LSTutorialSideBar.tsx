import whiteLogo from "@/assets/logo_white.png";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useSlideStore } from "../stores/LSSlideStore";
import { slideData } from "../stores";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function LSTutorialSideBar() {

    const navigate = useNavigate();

    return (
        <div 
            className="w-1/6 h-screen bg-blue-500 flex flex-col justify-between"
            style={{
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
            }}
        >

            {/* Logo */}
            <div className="w-2/5 flex flex-col items-end">
                <button className="flex mr-1 mt-7 mb-8 w-[78%]"
                    onClick={() => { navigate("/onboarding") }}
                >
                    <img src={whiteLogo} alt="Emma Healthcare Logo"/>
                </button>
            </div>

            {/* Tab 선택용 사이드바 */}
            <TabBar/>

            <button 
                className="underline mb-[15%] text-white"
                onClick={() => { navigate("/diagnosis") }}
            >
                Skip
            </button>
        </div>
    );
}

function TabBar() {

    const [t] = useTranslation();

    const highlightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const [buttonClickable, setButtonClickable] = useState(true);

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const highlightBoxStyle = cn(
        "w-5/6 transition-transform duration-300 ease-in-out z-5 py-7 rounded-2xl", 
        `h-[${buttonRef.current && (buttonRef.current.offsetHeight)}px]`
    );

    useEffect(() => {
        if (highlightRef.current && containerRef.current && buttonRef.current) {
            highlightRef.current.style.transform = `translateY(${(currentSlideIndex + 1) * (buttonRef.current.offsetHeight)}px)`;
        }
    }, [currentSlideIndex]);

    return (
        <div className="w-full flex flex-col" ref={containerRef}>
            
            <div className="w-full h-full flex flex-col justify-center items-center">

                {/* 이동식 버튼 하이라이트 박스 */}
                <div className={cn(highlightBoxStyle, "bg-white")} ref={highlightRef}/>

                {/* 버튼 리스트 */}
                {Array.from({ length: 6 }, (_, i) => (
                    <div className="z-10" ref={buttonRef} key={i}>
                        <button
                            className="w-full flex items-center justify-start p-4"
                            onClick={() => {
                                if (buttonClickable) {
                                    setButtonClickable(false)
                                    changeSlide(i);
                                    setTimeout(() => {
                                        setButtonClickable(true)
                                    }, 50);
                                }
                                setButtonClickable(false)
                            }}
                        >
                            <div/>
                            <div 
                                className={
                                    cn("flex flex-col items-center justify-center gap-4 w-full", 
                                    currentSlideIndex === i ? "text-blue-500" : "text-white")
                                }
                            >
                                {t(slideData[i].title)}
                            </div>
                        </button>
                    </div>
                ))}

                <div className={highlightBoxStyle}/>

            </div>
        </div>
    );
}