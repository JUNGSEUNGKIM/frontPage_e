// sign in시 사용하는 dialog
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

// Portal for modal
// DOM 최상단으로 끌어올리기
function ModalPortal({ children }: { children: ReactNode }) {
    // get element -> modal root in index.html
    const element = document.getElementById("modal-root")!;

    return createPortal(children, element);
}

export default function SignInModal({ onAccept }: { onAccept: () => void }) {
    // scroll 방지
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <ModalPortal>
            <div
                className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-40"
                aria-labelledby="Alert-Modal"
                role="dialog"
                aria-modal="true"
            >
                <div className="w-[50vw] flex flex-col gap-4 items-center bg-white p-8 rounded-lg">
                    <h1 className="text-lg font-medium text-center">
                        스마트폰으로 아래 QR 코드를 스캔하여 <br />
                        로그인 페이지에 접속 후 로그인 해주세요. <br />
                    </h1>

                    <h1 className="text-lg font-medium text-center">
                        로그인 완료 후, 하단의 완료 버튼을 눌러주세요.
                    </h1>
                    <div className="flex flex-row gap-4">
                        {/* LoginPage URL QRCode */}

                        {/* OTP code */}
                        <div className="flex flex-col gap-4">
                            <h1 className="font-lg text-center">OTP번호</h1>
                            <h1 className="text-xl font-bold text-center">
                                4F3G3A
                            </h1>
                        </div>
                    </div>
                    {/* buttons */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onAccept}
                        className="w-64 bg-blue-500 text-white rounded-lg py-4"
                    >
                        완료
                    </motion.button>
                </div>
            </div>
        </ModalPortal>
    );
}
