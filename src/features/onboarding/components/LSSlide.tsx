import { useTranslation } from "react-i18next";
import { useSlideStore } from "../stores";
import { slideData } from "../constants";
import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import PrimaryButton from "@/shared/components/PrimaryButton";

interface LSSlideProps {
    index: number,
    buttonMode?: boolean,
    onClick?: () => void,
}

export default function LSSlide({ index, buttonMode = false, onClick = () => {}}: LSSlideProps) {

    const [t] = useTranslation();

    const slideRef = useRef<HTMLDivElement>(null);

    const changeSlide = useSlideStore((state) => state.changeSlide);

    return (
        <div 
            className={cn(
                "w-5/6 flex flex-col items-center justify-center px-8 my-28 snap-center shrink-0", 
                "transition-transform duration-300 ease-in-out", 
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

                    {buttonMode ? 
                        <div className="w-[67%]">
                            <PrimaryButton label={t("btnStart")} onClick={onClick} />
                        </div>
                    :
                        <p className="text-2xl font-medium text-gray-700 bottom-0 w-1/2 text-center">
                            {t(slideData[index].description)}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}