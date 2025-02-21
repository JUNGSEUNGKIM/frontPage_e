import { useSlideStore } from "../stores";

export function PaginationDots() {

    const currentSlideIndex = useSlideStore((state) => state.currentSlideIndex);
    const changeSlide = useSlideStore((state) => state.changeSlide);

    const dots = [];
    for (let i = 0; i < 7; i++) {
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