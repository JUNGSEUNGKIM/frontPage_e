// only available on mobile

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type LoginStatus = "otp" | "signin" | "signup" | "done";

// TODO: Check otp slicing syntax

export default function MobileSignInPage() {
    const isMobile = window.innerWidth < 500;
    return (
        <div className="w-full h-screen bg-[#f8f8f8]">
            {isMobile ? <MobileSignInContent /> : <UnavailableContent />}
        </div>
    );
}

function MobileSignInContent() {
    // change component with login status
    const [currentStatus, setCurrentStatus] = useState<LoginStatus>("otp");

    const [otp, setOtp] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const OTP_LENGTH = 6;

    const otpArray = otp.padEnd(OTP_LENGTH, " ").split("");

    const enable: boolean = otp.length >= 6;

    const otpInputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // const enteredText = otpInputRef.current?.value;
        // save experienceId to store
        // console.log(enteredText);
        // change component -> login
        setCurrentStatus("signin");
    }

    // check input is currently focused
    useEffect(() => {
        const checkFocus = () => {
            if (otpInputRef.current) {
                setIsFocused(document.activeElement === otpInputRef.current);
            }
        };

        document.addEventListener("focusin", checkFocus);
        document.addEventListener("focusout", checkFocus);

        return () => {
            document.removeEventListener("focusin", checkFocus);
            document.removeEventListener("focusout", checkFocus);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center py-20 px-4">
            {currentStatus == "otp" && (
                <>
                    <h1 className="text-lg font-bold mb-4 text-center">
                        키오스크에 표시된
                        <br />
                        인증 번호를 입력해주세요
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* invisible input */}
                        <input
                            className="w-0 h-0 text-lg opacity-0 absolute"
                            ref={otpInputRef}
                            onChange={(e) => {
                                const newOtp = e.target.value.slice(
                                    0,
                                    OTP_LENGTH
                                );
                                // console.log(newOtp);
                                setOtp(newOtp);
                            }}
                        ></input>

                        <div
                            onClick={() => otpInputRef.current?.focus()}
                            className={cn(
                                "flex flex-row gap-2 p-4 bg-white shadow-md rounded-lg mb-4",
                                isFocused && "bg-blue-50"
                            )}
                        >
                            {otpArray.map((char, index) => (
                                <h1
                                    key={index}
                                    className="w-10 h-12 flex items-center justify-center text-2xl font-bold border-b-2 border-gray-400"
                                >
                                    {char}
                                </h1>
                            ))}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className={cn(
                                "w-80 p-4 mt-3 text-lg text-white font-semibold rounded-lg",
                                enable ? "bg-blue-500" : "bg-blue-300",
                                enable ? "shadow-lg" : ""
                            )}
                        >
                            확인
                        </motion.button>
                    </form>
                </>
            )}
            {currentStatus == "signin" && (
                <LoginComponent
                    onSubmit={() => {
                        setCurrentStatus("done");
                    }}
                />
            )}
            {currentStatus == "done" && <SignInDoneComponent />}
        </div>
    );
}

function SignInDoneComponent() {
    return <div>키오스크에서 확인 버튼을 클릭해주세요</div>;
}

// Login Component
function LoginComponent({ onSubmit }: { onSubmit: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const enable = email != "" && password != "";

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <h1 className="pb-2">이메일</h1>
                    <input
                        className="w-full p-1"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <h1 className="pb-2">비밀번호</h1>
                    <input
                        className="w-full p-1"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                <MobileButton enable={enable} />
            </form>
        </div>
    );
}

function MobileButton({ enable }: { enable: boolean }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={cn(
                "w-80 p-4 mt-3 text-lg text-white font-semibold rounded-lg",
                enable ? "bg-blue-500" : "bg-blue-300",
                enable ? "shadow-lg" : ""
            )}
        >
            확인
        </motion.button>
    );
}

function UnavailableContent() {
    return (
        <div>
            {/* Emoji */}
            <p>모바일에서 로그인을 시도해주세요</p>
        </div>
    );
}
