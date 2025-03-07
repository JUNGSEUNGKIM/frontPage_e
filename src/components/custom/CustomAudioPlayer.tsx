// import { useEffect, useRef, useState } from "react";
// import BackgroundSfx from "@/assets/audio/focus.mp3";

// const CustomAudioPlayer = () => {
//     const audioRef = useRef<HTMLAudioElement | null>(null);
//     const progressRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState("00:00");
//     const [duration, setDuration] = useState("00:00");

//     const formatTime = (time: number) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
//             2,
//             "0"
//         )}`;
//     };

//     const togglePlayPause = () => {
//         const audio = audioRef.current;
//         if (audio != null) {
//             if (audio.paused) {
//                 audio.play();
//                 setIsPlaying(true);
//             } else {
//                 audio.pause();
//                 setIsPlaying(false);
//             }
//         }
//     };

//     const handleTimeUpdate = () => {
//         const audio = audioRef.current;
//         const progress = progressRef.current;
//         const currentTime = audio.currentTime;
//         const totalDuration = audio.duration;

//         progress.value = (currentTime / totalDuration) * 100;
//         setCurrentTime(formatTime(currentTime));
//     };

//     const handleLoadedMetadata = () => {
//         const audio = audioRef.current;
//         setDuration(formatTime(audio.duration));
//     };

//     const handleSeek = (e) => {
//         const audio = audioRef.current;
//         const progress = progressRef.current;
//         if (audio != null && progress != null) {
//             const seekTime = (e.target.value / 100) * audio.duration;
//             audio.currentTime = seekTime;
//         }
//     };

//     useEffect(() => {
//         const audio = audioRef.current;
//         if (audio != null) {
//             audio.volume = 0.5; // 기본 볼륨을 50%로 설정
//             audio.loop = true;
//         }
//     }, []);

//     return (
//         <div className="w-full max-w-md mx-auto bg-white opacity-75 shadow-md rounded-md p-4">
//             <audio
//                 ref={audioRef}
//                 src={BackgroundSfx}
//                 onTimeUpdate={handleTimeUpdate}
//                 onLoadedMetadata={handleLoadedMetadata}
//                 className="hidden"
//             />
//             <div className="flex items-center justify-between">
//                 {/* Play/Pause Button */}
//                 <button
//                     onClick={togglePlayPause}
//                     className="w-10 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//                 >
//                     {isPlaying ? "⏸" : "▶"}
//                 </button>

//                 {/* Progress Bar */}
//                 <div className="flex-1 mx-4">
//                     <input
//                         ref={progressRef}
//                         type="range"
//                         defaultValue="0"
//                         onChange={handleSeek}
//                         className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//                     />
//                 </div>

//                 {/* Duration */}
//                 <span className="text-gray-600 text-sm">
//                     {currentTime} / {duration}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default CustomAudioPlayer;
