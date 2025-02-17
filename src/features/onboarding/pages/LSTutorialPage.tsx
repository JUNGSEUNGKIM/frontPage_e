// hooks
import { useEffect, useRef, useState } from "react";

// components
import { LSSlide, LSTutorialSideBar } from "../components";
import { useSlideStore } from "../stores";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export function LSTutorialPage() {

    const slidesRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState({ left: 0, top: 0 });

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    useEffect(() => {
        changeSlide(0)

        const handleScroll = () => {
            if (slidesRef.current) {
                setScrollPosition({
                left: slidesRef.current.scrollLeft,
                top: slidesRef.current.scrollTop,
                });
            }
        };
    
        if (slidesRef.current) {
            slidesRef.current.addEventListener('scroll', handleScroll);
            return () => {
                slidesRef.current?.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

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
            <LSTutorialSideBar 
                scrollPosition={ 
                    slidesRef.current ? scrollPosition.left / (slidesRef.current.scrollWidth / 6) : 0
                } 
            />
            
            <div className="flex flex-col w-5/6 h-full">

                <div className="h-full flex flex-nowrap overflow-x-hidden snap-x no-scrollbar"
                    style={{touchAction: 'none'}}
                    ref={slidesRef}
                >
                    <div className="w-1/12 shrink-0"/>

                    {Array.from({ length: 6 }, (_, i) => (
                        <LSSlide index={i}/>
                    ))}

                    <div className="w-1/12 shrink-0"/>

                </div>

                <PageButtons />
                
            </div>
        </div>
    );
}



function PaginationDots() {

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const dots = [];
    for (let i = 0; i < 6; i++) {
        dots.push(
        <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-3 h-3 rounded-full mx-1 ${currentSlideIndex === i ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-300 border-none cursor-pointer`}
        ></button>
        );
    }

    return <div className="flex items-center justify-center">{dots}</div>;
};

function PageButtons() {
    
    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const buttonStyle = "rounded-full bg-blue-500 hover:bg-blue-700 text-white p-2 transition duration-300 ease-in-out"
    
    const [buttonClickable, setButtonClickable] = useState(true);
    const buttonCooldown = 500

    return (
        <div className="w-5/6 flex items-center justify-center absolute bottom-8 space-x-16">
            <button
                onClick={() => {
                    if (buttonClickable) {
                        changeSlide(Math.max(currentSlideIndex - 1, 0));
                        setTimeout(() => {
                            setButtonClickable(true)
                        }, buttonCooldown);
                    }
                    setButtonClickable(false)
                }}
                className={buttonStyle}
            >
                <LuArrowLeft className="text-3xl" />
            </button>

            <PaginationDots />

            <button
                onClick={() => {
                    if (buttonClickable) {
                        changeSlide(Math.min(currentSlideIndex + 1, 5));
                        setTimeout(() => {
                            setButtonClickable(true)
                        }, buttonCooldown);
                    }
                    setButtonClickable(false)
                }}
                className={buttonStyle}
            >
                <LuArrowRight className="text-3xl" />
            </button>
        </div>
    );
}