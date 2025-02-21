// hooks
import { useEffect, useRef, useState } from "react";

// components
import { LSSlide, LSTutorialSideBar, PaginationDots } from "../components";
import { useSlideStore } from "../stores";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

// misc.
import { motion } from "motion/react";

export function LSTutorialPage() {

    const slidesRef = useRef<HTMLDivElement>(null)

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    // 첫 슬라이드로 시작 
    useEffect(() => {
        changeSlide(0);
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

                {/* 하단 페이지 버튼 및 현재 페이지 표시 */}
                <PageButtons />
                
            </div>
        </div>
    );
}

function PageButtons() {
    
    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const buttonStyle = "rounded-full bg-blue-500 hover:bg-blue-700 text-white p-2 transition duration-300 ease-in-out"
    
    // 버튼 연타 방지 (애니메이션이 다음 페이지로 가기 전에 추가 클릭할 경우 애니메이션이 부자연스러움)
    const [buttonClickable, setButtonClickable] = useState(true);
    const buttonCooldown = 500

    return (
        <div className="w-5/6 flex items-center justify-center absolute bottom-8 space-x-16">
            <motion.button
                onClick={() => {
                    if (buttonClickable) {
                        changeSlide(Math.max(currentSlideIndex - 1, 0));
                        setTimeout(() => {
                            setButtonClickable(true)
                        }, buttonCooldown);
                    }
                    setButtonClickable(false)
                }}
                whileTap={{ scale: 0 }}
                className={buttonStyle}
            >
                <LuArrowLeft className="text-3xl" />
            </motion.button>

            <PaginationDots />

            <motion.button
                onClick={() => {
                    if (buttonClickable) {
                        changeSlide(Math.min(currentSlideIndex + 1, 5));
                        setTimeout(() => {
                            setButtonClickable(true)
                        }, buttonCooldown);
                    }
                    setButtonClickable(false)
                }}
                whileTap={{ scale: 0 }}
                className={buttonStyle}
            >
                <LuArrowRight className="text-3xl" />
            </motion.button>
        </div>
    );
}