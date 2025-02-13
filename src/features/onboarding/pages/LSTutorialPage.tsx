// hooks
import { useEffect, useRef, useState } from "react";

// components
import { LSSlide, LSTutorialSideBar } from "../components";
import { useSlideStore } from "../stores";

export function LSTutorialPage() {

    const slidesRef = useRef<HTMLDivElement>(null)
    const [scrollPosition, setScrollPosition] = useState({ left: 0, top: 0 });

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);

    useEffect(() => {
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

                <div className="h-full flex flex-nowrap overflow-x-auto snap-x no-scrollbar"
                    ref={slidesRef}
                >
                    <div className="w-1/12 shrink-0"/>

                    {Array.from({ length: 6 }, (_, i) => (
                        <LSSlide index={i}/>
                    ))}

                    <div className="w-1/12 shrink-0"/>

                </div>

                <PaginationDots />
            </div>
        </div>
    );
}



function PaginationDots() {

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);

    const dots = [];
    for (let i = 0; i < 6; i++) {
        dots.push(
        <button
            key={i}
            className={`w-3 h-3 rounded-full mx-1 ${currentSlideIndex === i ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-300 border-none cursor-pointer`}
        ></button>
        );
    }

    return <div className="w-5/6 flex items-center justify-center absolute bottom-16">{dots}</div>;
};