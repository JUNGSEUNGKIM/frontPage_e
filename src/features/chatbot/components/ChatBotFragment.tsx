import { useRef, useEffect, useState } from "react";

const SOCKET_SERVER_URL = "http://127.0.0.1/:5001";
//TODO: 한 / 영 모드 변경 고려

// audio 입력을 canvas에 파형으로 그려주는 함수
function AudioVisualizer({ analyser }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) return;

        const ctx = canvas.getContext("2d");
        if (ctx == null) return;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const draw = () => {
            analyser.getByteTimeDomainData(dataArray);
            ctx.fillStyle = "#f5f5f5";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = "#ff0000";
            ctx.beginPath();
            const sliceWidth = canvas.width / dataArray.length;
            let x = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
            requestAnimationFrame(draw);
        };

        draw();
    }, [analyser]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={100}
            style={{ border: "1px solid #ccc", marginTop: 10 }}
        />
    );
}

export default function ChatBotFragment() {
    const [userName, setUserName] = useState("");
    const [nameSubmitted, setNameSubmitted] = useState(false);
    // isLLMReady가 false이면 첫 인사 메시지가 오기 전이므로 입력 불가능
    const [isLLMReady, setIsLLMReady] = useState(false);
    const [text, setText] = useState("");
    const [speaker, setSpeaker] = useState("B");
    const [isLoading, setIsLoading] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [inputMode, setInputMode] = useState("text"); // "text" 또는 "voice"
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioAnalyser, setAudioAnalyser] = useState(null);

    const socketRef = useRef();
    const audioRef = useRef();
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerIntervalRef = useRef(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);

        // LLM 채팅 응답 수신
        socketRef.current.on("chat_response", (data) => {
            setIsLoading(false);
            // 첫번째 응답(인사)이 오면 isLLMReady를 true로 변경
            if (
                !isLLMReady &&
                data.conversation &&
                data.conversation.length === 1 &&
                data.conversation[0].role === "assistant"
            ) {
                setIsLLMReady(true);
            }
            if (data.conversation) {
                setChatList(data.conversation);
            }
            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audioRef.current = audio;
                audio.play();
            }
        });

        socketRef.current.on("stt_transcript", (data) => {
            const transcript = data.transcript;
            setChatList((prev) => {
                const newList = [...prev];
                if (
                    newList.length > 0 &&
                    newList[newList.length - 1].text === "[음성 메시지]"
                ) {
                    newList[newList.length - 1] = {
                        role: "user",
                        text: transcript,
                        name: userName,
                    };
                } else {
                    newList.push({
                        role: "user",
                        text: transcript,
                        name: userName,
                    });
                }
                return newList;
            });
        });

        socketRef.current.on("reset_response", (data) => {
            setChatList([
                { role: "assistant", text: data.message, name: "엠마" },
            ]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [isLLMReady, userName]);

    useEffect(() => {
        if (isRecording) {
            timerIntervalRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerIntervalRef.current);
            setRecordingTime(0);
        }
        return () => clearInterval(timerIntervalRef.current);
    }, [isRecording]);

    const handleNameSubmit = () => {
        if (!userName.trim()) return;
        setNameSubmitted(true);
        socketRef.current.emit("register_user", {
            user_name: userName,
            speaker,
        });
    };

    const handleSend = () => {
        if (!isLLMReady) return; // LLM 인사 전까지 전송 불가
        const trimText = text.trim();
        if (!trimText) return;
        setIsLoading(true);
        setChatList((prev) => [
            ...prev,
            { role: "user", text: trimText, name: userName },
        ]);
        socketRef.current.emit("chat_request", { text: trimText, speaker });
        setText("");
    };

    const handleReset = () => {
        socketRef.current.emit("reset_conversation");
    };

    const handleVoiceToggle = async () => {
        if (!isLLMReady) return; // 인사 전까지 음성 녹음 불가
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                const audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);
                setAudioAnalyser(analyser);

                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data);
                    }
                };

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, {
                        type: "audio/wav",
                    });
                    const reader = new FileReader();
                    reader.readAsDataURL(audioBlob);
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        setChatList((prev) => [
                            ...prev,
                            {
                                role: "user",
                                text: "[음성 메시지]",
                                name: userName,
                            },
                        ]);
                        socketRef.current.emit("voice_chat_request", {
                            audio_data: base64data,
                            speaker,
                        });
                        setIsLoading(true);
                    };
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("마이크 접근 실패:", err);
            }
        } else {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setAudioAnalyser(null);
        }
    };

    const renderChatMessage = (msg, index) => {
        const displayName = msg.role === "user" ? userName : "엠마";
        return (
            <div
                key={index}
                style={{
                    textAlign: msg.role === "user" ? "right" : "left",
                    margin: "10px 0",
                }}
            >
                <div
                    style={{
                        fontSize: "0.8em",
                        marginBottom: 2,
                        color: "#555",
                    }}
                >
                    {displayName}
                </div>
                <div
                    style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: msg.role === "user" ? "#DCF8C6" : "#EAEAEA",
                    }}
                >
                    {msg.text}
                </div>
            </div>
        );
    };

    if (!nameSubmitted) {
        return (
            <div
                style={{
                    maxWidth: 400,
                    margin: "50px auto",
                    padding: 20,
                    textAlign: "center",
                }}
            >
                <h2>이름을 입력해주세요</h2>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="예: 홍길동"
                    style={{ width: "80%", padding: 10, fontSize: "1em" }}
                />
                <br />
                <button
                    onClick={handleNameSubmit}
                    style={{ marginTop: 20, padding: "10px 20px" }}
                >
                    시작하기
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <h1>Chat + TTS 데모</h1>

            {/* 모드 전환 탭 */}
            <div style={{ marginBottom: 20 }}>
                <button
                    onClick={() => setInputMode("text")}
                    style={{
                        marginRight: 10,
                        backgroundColor: inputMode === "text" ? "#ccc" : "",
                    }}
                >
                    텍스트 모드
                </button>
                <button
                    onClick={() => setInputMode("voice")}
                    style={{
                        backgroundColor: inputMode === "voice" ? "#ccc" : "",
                    }}
                >
                    음성 모드
                </button>
            </div>

            {/* 대화 리셋 버튼 */}
            <div style={{ marginBottom: 10 }}>
                <button onClick={handleReset}>대화 리셋</button>
            </div>

            {/* 스피커 선택 */}
            <div style={{ marginBottom: 10 }}>
                <label>
                    스피커 선택:{" "}
                    <select
                        value={speaker}
                        onChange={(e) => setSpeaker(e.target.value)}
                    >
                        <option value="A">스피커 A</option>
                        <option value="B">스피커 B</option>
                        <option value="C">스피커 C</option>
                        <option value="D">스피커 D</option>
                        <option value="E">스피커 E</option>
                    </select>
                </label>
            </div>

            {/* 채팅 로그 */}
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: 10,
                    height: 400,
                    overflowY: "auto",
                    marginBottom: 10,
                }}
            >
                {chatList.map(renderChatMessage)}
            </div>

            {/* 입력 영역 */}
            {inputMode === "text" ? (
                <div>
                    <div style={{ marginBottom: 10 }}>
                        <textarea
                            rows={3}
                            style={{ width: "100%" }}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={
                                isLLMReady
                                    ? "질문을 입력하세요..."
                                    : "AI 상담사 엠마를 불러오는 중입니다."
                            }
                            disabled={!isLLMReady}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!isLLMReady || isLoading}
                    >
                        {isLoading ? "생성 중..." : "전송"}
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        onClick={handleVoiceToggle}
                        disabled={!isLLMReady || isLoading}
                        style={{
                            backgroundColor: isRecording ? "#ff4d4d" : "",
                        }}
                    >
                        {isRecording ? "녹음 종료" : "녹음 시작"}
                    </button>
                    {isRecording && (
                        <div style={{ marginTop: 10 }}>
                            <AudioVisualizer analyser={audioAnalyser} />
                            <div>녹음 중... {recordingTime}s</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
