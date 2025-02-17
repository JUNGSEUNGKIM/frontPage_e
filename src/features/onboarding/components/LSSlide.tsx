import { useTranslation } from "react-i18next";
import { slideData, useSlideStore } from "../stores";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { log } from "@techstark/opencv-js";

interface LSSlideProps {
    index: number,
}

export default function LSSlide({index}: LSSlideProps) {

    const [t] = useTranslation();

    const slideRef = useRef<HTMLDivElement>(null);
    const [isTranslated, setIsTranslated] = useState(false);

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    // useEffect(() => {
    //     if (slideRef.current) {
    //         if (currentSlideIndex === index) {
    //             setIsTranslated(true);
    //         } else {
    //             setIsTranslated(false);
    //         }
    //     }
    // }, [currentSlideIndex]);

    return (
        <div 
            className={cn(
                "w-5/6 flex flex-col items-center justify-center px-8 my-28 snap-center shrink-0", 
                "transition-transform duration-300 ease-in-out", 
                isTranslated && "translate-y-[-5%]"
            )}
            ref={slideRef}
            
        >
            
            <div className="w-full h-full p-1" 
                style={{ 
                    borderRadius: 50,
                    background: `linear-gradient(${-Math.PI/4}rad, ${slideData[index].borderColorGradientEdge}, ${slideData[index].borderColorGradientMiddle}, ${slideData[index].borderColorGradientEdge})`,
                }}
                onClick={() => {
                    changeSlide(index)
                    console.log(`change to ${index}`)
                }}
            >
                <div className="flex flex-col items-center justify-between w-full h-full p-16"
                    style={{ 
                        borderRadius: 47.5,
                        background: `linear-gradient(to top, ${slideData[index].backgroundColorGradientBottom}, ${slideData[index].backgroundColorGradientTop})`,
                    }}
                >
                    <h1 className="text-5xl font-bold text-gray-700 w-full">
                        {t(slideData[index].title)}
                    </h1>

                    <img className="h-1/2 translate-y-1/4 z-10" src={slideData[index].image}/>
                    <img className="h-1/4" src={slideData[index].shadow}/>

                    <p className="text-2xl font-medium text-gray-700 bottom-0 w-1/2 text-center">
                        {t(slideData[index].description)}
                    </p>
                </div>
            </div>
        </div>
    );
}