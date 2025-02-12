import whiteLogo from "@/assets/logo_white.png";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useSlideStore } from "../stores/SlideStore";
import { slideData } from "../stores";
import { LegacyRef, Ref, RefObject, useEffect, useRef } from "react";

export default function LSOnboardingSidebar() {

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
                <div className="flex mr-1 mt-7 mb-8 w-[78%]">
                    <img src={whiteLogo} alt="Emma Healthcare Logo"/>
                </div>
            </div>

            {/* Tab 선택용 사이드바 */}
            <TabBar />

            <button className="underline mb-[8%]">
                Skip
            </button>
        </div>
    );
}

function TabBar() {

    const highlightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);

    const highlightBoxStyle = "bg-white w-full transition-transform duration-300 ease-in-out"

    useEffect(() => {
        console.log(buttonRef.current)
        if (highlightRef.current && containerRef.current && buttonRef.current) {
          const slideHeight = containerRef.current.clientHeight / buttonRef.current.offsetHeight; // Calculate height dynamically
          highlightRef.current.style.transform = `translateY(${currentSlideIndex * slideHeight}px)`;
        }
      }, [currentSlideIndex]);

    return (
        <div className="w-full" ref={containerRef}>
            
            <div className={cn(highlightBoxStyle, `h-[${buttonRef.current ? buttonRef.current.clientHeight : 0}px]`)} ref={highlightRef}/>

            <div className="w-full h-full flex flex-col justify-center items-center px-4 gap-4">

                <TabBarButton slideIndex={0} ref={buttonRef} />
                <TabBarButton slideIndex={1} />
                <TabBarButton slideIndex={2} />
                <TabBarButton slideIndex={3} />
                <TabBarButton slideIndex={4} />
                <TabBarButton slideIndex={5} />
            </div>

            <div/>
        </div>
    );
}

interface TabBarButtonProps {
    slideIndex: number,
    ref?: RefObject<HTMLButtonElement> | null,
}

function TabBarButton({slideIndex, ref = null}: TabBarButtonProps) {

    const [t] = useTranslation();

    const changeSlide = useSlideStore((state) => state.changeSlide);

    const buttonStyle = "flex flex-col items-center justify-center gap-4 w-full rounded-md"
    const iconStyle = "w-12"
    const selectionIndicatorStyle = "w-[12px] h-full"

    return (
        <button
            className="w-full flex items-center justify-start"
            ref={ref}
            onClick={() => {
                changeSlide(slideIndex);
            }}
            >
            <div/>
            <div className="flex flex-col items-center justify-center gap-4 w-full rounded-mdbg-blue-500 text-white">
                {/* <img src={selectedIcon} className={iconStyle}/> */}
                {t(slideData[slideIndex].title)}
            </div>
        </button>
    );
}