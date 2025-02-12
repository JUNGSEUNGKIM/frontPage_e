// hooks
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import {
    OnboardingButton,
    SelectableLanguageButton,
    DynamicEmoji,
    Tutorial,
    LSSlide,
} from "../components";

import LogoButton from "@/shared/components/LogoButton";


// assets
import LSOnboardingSidebar from "../components/LSOnboardingSidebar";
import { useSlideStore } from "../stores";

export function LSOnboardingPage() {

    const slidesRef = useRef<HTMLDivElement>(null)

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);

    useEffect(() => {
        if (slidesRef.current) {
            slidesRef.current.scrollTo({
              left: slidesRef.current.offsetWidth * currentSlideIndex * 5/6,
              behavior: 'smooth',
            });
          }
    }, [currentSlideIndex]);

    return (
        <div className="w-full h-screen flex justify-between">
            <LSOnboardingSidebar />
            
            <div className="w-5/6 h-full flex flex-nowrap overflow-x-auto snap-x scrollbar-hide no-scrollbar"
                ref={slidesRef}
            >
                <div className="w-1/12 shrink-0"/>
                <LSSlide />
                <LSSlide />
                <LSSlide />
                <LSSlide />
                <LSSlide />
                <LSSlide />
                <div className="w-1/12 shrink-0"/>

            </div>
        </div>
    );
}
