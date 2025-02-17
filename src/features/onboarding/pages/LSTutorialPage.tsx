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

///////////////////////////////////////////////////////////////////////////////////////

    const scrollTimeoutRef = useRef<number | undefined>(undefined);
    const [isScrolling, setIsScrolling] = useState(false);

///////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const handleScroll = () => {
            // console.log(`${isScrolling}`)
            setIsScrolling(true);
            if (slidesRef.current) {
                setScrollPosition({
                left: slidesRef.current.scrollLeft,
                top: slidesRef.current.scrollTop,
                });
                clearTimeout(scrollTimeoutRef.current);
            }
        };

        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
            // console.log('Scrolling stopped!');
        }, 200);
    
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

    useEffect(() => {
        if (!isScrolling) {
            // console.log("STOPPED SCROLLING!")
        }
    }, [isScrolling]);

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

                {/* <PaginationDots /> */}
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

    return (
        <div className="w-5/6 flex items-center justify-center absolute bottom-8 space-x-16"> {/* Container for the buttons */}
            <button
                onClick={() => changeSlide(Math.max(currentSlideIndex - 1, 0))}
                className="rounded-full bg-blue-500 hover:bg-blue-700 text-white p-2 transition duration-300 ease-in-out"
            >
                <LuArrowLeft className="text-3xl" /> {/* Adjust size as needed */}
            </button>

            <PaginationDots />

            <button
                onClick={() => changeSlide(Math.min(currentSlideIndex + 1, 5))}
                className="rounded-full bg-blue-500 hover:bg-blue-700 text-white p-2 transition duration-300 ease-in-out"
            >
                <LuArrowRight className="text-3xl" /> {/* Adjust size as needed */}
            </button>
        </div>
    );
}