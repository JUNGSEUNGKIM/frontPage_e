import { useState, useEffect, useRef } from "react";
import {
    Button,
    Box,
    Text,
    Flex,
    Spinner,
    VStack,
    Stack,
} from "@chakra-ui/react";

export function ChatFragment() {
    const MicIcon = ({ size = 50, color = "currentColor" }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
    );
    const [activeStates, setActiveStates] = useState([
        false,
        false,
        false,
        false,
    ]);
    const handlePointerDown = (index) => {
        setActiveStates((prev) => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
        });
    };

    const handlePointerUp = (index) => {
        setActiveStates((prev) => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
        });
    };

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMic, setIsMic] = useState(true);
    const [speakQueue, setSpeakQueue] = useState([]);
    const wsRef = useRef(null);
    const synth = window.speechSynthesis;
    const messagesEndRef = useRef(null);
    const [isMount, setIsMount] = useState(true);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // TTS 큐 처리
    useEffect(() => {
        if (speakQueue.length >= 0 && !isSpeaking) {
            if (isMount) {
                setIsMount(false);
            } else {
                speakNextInQueue();
            }
        }
    }, [speakQueue, isSpeaking]);

    const speakNextInQueue = () => {
        // console.log("speakQueue Size:", speakQueue.length)
        console.log("Dd", isLoading);
        console.log("dD", isSpeaking);
        if (!isLoading) {
            setIsLoading(true);
        }
        if (speakQueue.length === 0) {
            setIsSpeaking(false);
            setIsLoading(false);
            if (!isListening && isMic) {
                handleStartListening();
            }
            return;
        }

        setIsSpeaking(true);
        const text = speakQueue[0];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ko-KR";

        utterance.onend = () => {
            setSpeakQueue((prev) => prev.slice(1));
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error("TTS Error:", event);
            setSpeakQueue((prev) => prev.slice(1));
            setIsSpeaking(false);
        };

        try {
            synth.speak(utterance);
        } catch (error) {
            console.error("TTS Speak Error:", error);
            setSpeakQueue((prev) => prev.slice(1));
            setIsSpeaking(false);
        }
    };

    useEffect(() => {
        wsRef.current = new WebSocket("ws://172.30.1.16:5554/ws");
        // wsRef.current = new WebSocket("ws://172.30.1.16:5554/ws");

        wsRef.current.onopen = () => {
            console.log("WebSocket Connected");
            sendMessageToServer("start_conversation");
        };

        wsRef.current.onmessage = (event) => {
            handleServerResponse(event);
        };

        wsRef.current.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        wsRef.current.onclose = () => {
            console.log("WebSocket Disconnected");
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            synth.cancel();
            recognition.stop();
        };
    }, []);

    const sendMessageToServer = (text) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            setIsLoading(true);
            wsRef.current.send(JSON.stringify({ message: text }));
        }
    };

    const handleStartListening = () => {
        setIsMic(true);
        setIsListening(true);
        synth.cancel();
        recognition.continuous = true;
        recognition.start();

        console.log("speech recognition server start");
    };

    recognition.onresult = (event) => {
        const result = event.results[0];
        const text = result[0].transcript;

        if (result.isFinal) {
            setMessages((prev) => [{ type: "user", content: text }, ...prev]);
            sendMessageToServer(text);
            recognition.stop();
            // setIsListening(false);
        }
    };

    recognition.onend = () => {
        console.log("Speech recognition service disconnected.");
        setIsListening(false);
    };

    const handleServerResponse = (response) => {
        if (response.data === "") {
            response.data = "test";
        }
        const data = response.data;
        // const sentence_data = data.split(/[.!?]\s+/);
        setMessages((prev) => [{ type: "bot", content: data }, ...prev]);

        // 응답을 문장 단위로 분리하여 큐에 추가
        const sentences = data.split(/[.!?]\s+/);
        setSpeakQueue((prev) => [
            ...prev,
            ...sentences.filter((s) => s.trim()),
        ]);
    };

    const synthCancel = () => {
        if (speakQueue.length > 0) {
            synth.cancel();

            setIsSpeaking(false);
            setIsLoading(false);
            setIsListening(true);
            setSpeakQueue([]);
            handleStartListening();
        }
    };

    const buttonMessage = (text) => {
        synth.cancel();
        setIsMic(false);
        setSpeakQueue([]);

        recognition.stop();
        setMessages((prev) => [{ type: "user", content: text }, ...prev]);
        sendMessageToServer(text);
    };

    return (
        <Flex
            h="55vh"
            bg="gray.50"
            p="1"
            flexDirection="column"
            w="100%"
            pt="3vh"
            justifyContent="space-between"
        >
            <Flex
                flex="1"
                bg="white"
                p={6}
                flexDirection="column"
                rounded="xl"
                overflow="hidden"
                w="100%"
            >
                <Flex

                    mb={0}
                >
                    <Box maxW="100%"
                         p={0}
                         rounded="lg">

                    </Box>
                </Flex>
                <Flex flex="1" flexDirection="column-reverse" overflowY="auto">

                    <Box ref={messagesEndRef} />

                    {messages.map((message, index) => (
                        <Flex
                            key={index}
                            justify={
                                message.type === "user"
                                    ? "flex-end"
                                    : "flex-start"
                            }
                            mb={4}
                        >
                            <Box
                                maxW="70%"
                                p={3}
                                rounded="lg"
                                bg={
                                    message.type === "user"
                                        ? "blue.500"
                                        : "gray.100"
                                }
                                color={
                                    message.type === "user"
                                        ? "white"
                                        : "gray.800"
                                }
                            >
                                {message.content}
                            </Box>
                        </Flex>
                    ))}
                </Flex>
            </Flex>

            <Flex flexDirection="column">
                <Flex justifyContent="space-around">
                    <Button
                        onClick={() => buttonMessage("그렇지 않다")}
                        p={0}
                        h="4vh"
                        flex="1"
                        m={3}
                        rounded="lg"
                        onPointerDown={() => handlePointerDown(0)}
                        onPointerUp={() => handlePointerUp(0)}
                        bg={activeStates[0] ? "whiteAlpha.500" : "blue.500"}
                        color="white"
                    >
                        A. 그렇지 않다
                    </Button>
                    <Button
                        onClick={() => buttonMessage("주 2-3 회 정도 그렇다")}
                        p={0}
                        h="4vh"
                        flex="1"
                        m={3}
                        rounded="lg"
                        onPointerDown={() => handlePointerDown(1)}
                        onPointerUp={() => handlePointerUp(1)}
                        bg={activeStates[1] ? "whiteAlpha.500" : "blue.500"}
                        color="white"
                    >
                        B. 주 2-3 회 정도 그렇다
                    </Button>
                    <Button
                        onClick={() => buttonMessage("주 3-5 회 정도 그렇다")}
                        p={0}
                        h="4vh"
                        flex="1"
                        m={3}
                        rounded="lg"
                        onPointerDown={() => handlePointerDown(2)}
                        onPointerUp={() => handlePointerUp(2)}
                        bg={activeStates[2] ? "whiteAlpha.500" : "blue.500"}
                        color="white"
                    >
                        C. 주 3-5 회 정도 그렇다
                    </Button>
                    <Button
                        onClick={() => buttonMessage(" 거의 매일 그렇다")}
                        p={0}
                        h="4vh"
                        flex="1"
                        m={3}
                        rounded="lg"
                        onPointerDown={() => handlePointerDown(3)}
                        onPointerUp={() => handlePointerUp(3)}
                        bg={activeStates[3] ? "whiteAlpha.500" : "blue.500"}
                        color="white"
                    >
                        D. 거의 매일 그렇다
                    </Button>
                </Flex>

                <Flex
                    mt={4}
                    justify="center"
                    align="center"
                    gap={4}
                    bg="white"
                    p={4}
                    rounded="lg"
                    h="8vh"
                    flexDirection="row"
                    justifyContent="space-around"
                >
                    <Stack
                        flexDirection="row"
                        flex="1"
                        justifyContent="flex-end"
                    >
                        {isLoading && !isListening && (
                            <Flex align="center" gap={2}>
                                {/*<Spinner size="md" color="blue.500" />*/}
                                <Box color="gray.600">
                                    CHATBOT
                                    {isSpeaking
                                        ? " 응답 중..."
                                        : " 응답 대기중..."}
                                </Box>
                            </Flex>
                        )}
                        {isListening && !isLoading && (
                            <Flex align="center" gap={2}>
                                {/*<Spinner size="md" color="red.500" />*/}
                                <Box color="gray.600">
                                    사용자 응답 대기중...
                                </Box>
                            </Flex>
                        )}

                        <Button
                            onClick={handleStartListening}
                            p={3}
                            rounded="full"
                            w="4vh"
                            h="4vh"
                            bg={
                                isListening || isLoading
                                    ? "red.500"
                                    : "blue.500"
                            }
                            className={
                                isListening || isLoading ? "animate-pulse" : ""
                            }
                            _hover={{
                                bg:
                                    isListening || isLoading
                                        ? "red.600"
                                        : "blue.600",
                            }}
                            disabled={isListening || isLoading}
                        >
                            <MicIcon size={32} color="white" />
                        </Button>
                    </Stack>
                    <Stack
                        flexDirection="row"
                        flex="1"
                        justifyContent="space-between"
                    >
                        <Button
                            onClick={synthCancel}
                            p={3}
                            rounded="full"
                            w="4vh"
                            h="4vh"
                            className="bg-slate-500"
                        >
                            <MicIcon size={3} color="white" />
                        </Button>
                        <Button
                            onClick={() => buttonMessage("검진")}
                            p={0}
                            h="4vh"
                            m={0}
                            bg="blue.500"
                            rounded="lg"
                            w="10vh"
                        >
                            대화형 검진
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default ChatFragment;
