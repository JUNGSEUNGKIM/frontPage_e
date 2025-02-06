import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";

export default function CameraCard() {
    const [t] = useTranslation();

    // 웹캠 참조 타입 명시
    const webcamRef = useRef<Webcam>(null);

    // 상태 타입 명시
    const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운 값 (초 단위)
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // 캡처된 이미지

    // 카운트다운 로직
    useEffect(() => {
        if (countdown === null) return;

        if (countdown > 0) {
            const timer = setTimeout(
                () => setCountdown((prev) => (prev ?? 0) - 1),
                1000
            );
            return () => clearTimeout(timer);
        }

        if (countdown === 0) {
            captureImage(); // 캡처 실행
        }
    }, [countdown]);

    // 재촬영
    const retakeImage = (): void => {
        setCapturedImage(null);
        setCountdown(5); // 카운트다운 시작
    };

    // 이미지 캡처 함수
    const captureImage = (): void => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setCountdown(null); // 카운트다운 종료
        }
    };

    return (
        <div className="bg-gray-100 w-1/3">
            <div className="flex flex-col items-center justify-center h-full pt-4">
                {capturedImage == null && (
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        reversed={true}
                        screenshotFormat="image/png"
                        className="w-full h-full object-cover rounded"
                    />
                )}
                {/* 하단 UI 분기 */}
                {capturedImage ? (
                    <>
                        {/* 캡처된 이미지 표시 */}
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="w-full h-full object-cover rounded"
                        />
                        <button
                            onClick={retakeImage}
                            className="w-full mt-4 py-1 bg-white text-slate-400 opacity-90 text-lg shadow rounded"
                        >
                            ↻
                        </button>
                    </>
                ) : countdown !== null ? (
                    <div className="w-full mt-4 py-2 bg-blue-500 text-white text-center rounded">
                        {countdown}
                    </div>
                ) : (
                    <button
                        onClick={() => setCountdown(5)}
                        className="w-full mt-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {t("btnStartCapture")}
                    </button>
                )}
            </div>
        </div>
    );
}
