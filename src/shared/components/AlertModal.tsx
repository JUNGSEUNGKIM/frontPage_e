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

interface AlertModalProps {
    title: string;
    desc: string;
    onAccept: () => void;
    onCancel: () => void;
}

export default function AlertModal({
    title,
    desc,
    onAccept,
    onCancel,
}: AlertModalProps) {
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
                <div className="w-[40vw] flex flex-col gap-16 bg-white p-8 rounded-lg">
                    <h1 className="font-bold text-center text-4xl">{title}</h1>
                    <p className="text-2xl text-center">{desc}</p>
                    {/* buttons */}
                    <div className="w-full flex flex-row gap-4 justify-end font-medium">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={onCancel}
                            className="w-full border border-slate-400 text-black bg-white rounded-lg py-6 text-2xl"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={onAccept}
                            className="w-full bg-blue-500 text-white rounded-lg py-6 text-2xl"
                        >
                            Stop
                        </motion.button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
}
