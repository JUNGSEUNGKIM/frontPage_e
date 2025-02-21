// hooks
import { useEffect, useRef, useState } from "react";

// components
import { LSSlide, LSTutorialSideBar, PaginationDots } from "../components";
import { useSlideStore } from "../stores";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

export function LSTutorialPage() {

    const slidesRef = useRef<HTMLDivElement>(null)

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    // 첫 슬라이드로 시작 
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

    // 부드러운 슬라이드 스크롤 효과
    useEffect(() => {
        if (slidesRef.current) {
            slidesRef.current.scrollTo({
                left: slidesRef.current.offsetWidth * currentSlideIndex * 5/6,
                behavior: 'smooth',
            });
        }
    }, [currentSlideIndex]);

    // 좌우 넘기기 모션 감지지
    useEffect(() => {
        const handleTouchStart = (event: TouchEvent) => {
        setTouchStartX(event.touches[0].clientX);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (touchStartX === null || !slidesRef.current) return;

            const currentX = event.touches[0].clientX;
            const deltaX = currentX - touchStartX;

            const threshold = 50; // 드래그 최소 거리

            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    changeSlide(Math.max(currentSlideIndex - 1, 0));
                } else {
                    changeSlide(Math.min(currentSlideIndex + 1, 5));
                }
                setTouchStartX(null);
            }
        };

        const handleTouchEnd = () => { // 손가락 뗄 경우 리셋
            setTouchStartX(null);
        }

        const container = slidesRef.current;
        if (container) {
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);

            return () => {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [touchStartX]);

    return (
        <div className="w-full h-screen flex justify-between">

            {/* 네비게이션 사이드바 */}
            <LSTutorialSideBar />
            
            <div className="flex flex-col w-5/6 h-full">

                <div className="h-full flex flex-nowrap overflow-x-hidden snap-x no-scrollbar"
                    style={{touchAction: 'none'}}
                    ref={slidesRef}
                >
                    <div className="w-1/12 shrink-0"/>

                    {/* 슬라이드 */}
                    {Array.from({ length: 6 }, (_, i) => (
                        <LSSlide index={i} key={i}/>
                    ))}

                    <div className="w-1/12 shrink-0"/>

                </div>

                <PageButtons />
                
            </div>
        </div>
    );
}

function PageButtons() {
    
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