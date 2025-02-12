import { useTranslation } from "react-i18next";
import { useSlideStore } from "../stores";

export default function LSSlide() {

    const currentSlide = useSlideStore((state) => state.currentSlide);
    const [t] = useTranslation();

    return (
        <div className="w-5/6 flex flex-col items-center justify-center px-8 my-32 snap-center shrink-0">
            
            <div className="bg-blue-200 flex flex-col items-center justify-center w-full h-full" 
                style={{ borderRadius: 50 }}>
                <h1>
                    {t(currentSlide.title)}
                </h1>

                <p>
                    {t(currentSlide.description)}
                </p>
            </div>
        </div>
    );
}