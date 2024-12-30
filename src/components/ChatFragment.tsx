import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, Text, Flex, Spinner, VStack } from '@chakra-ui/react';

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
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
    );
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking,setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const wsRef = useRef(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;

    const messagesEndRef = useRef(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // TTS 설정
    const synth = window.speechSynthesis;

    useEffect(() => {
        wsRef.current = new WebSocket('ws://172.30.1.16:5554/ws');

        wsRef.current.onopen = () => {
            console.log('WebSocket Connected');
            // 서버로부터 자동으로 초기 메시지 요청
            sendMessageToServer("start_conversation");
        };

        wsRef.current.onmessage = (event) => {
            handleServerResponse(event);
        };

        wsRef.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        wsRef.current.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            window.speechSynthesis.cancel();
        };
    }, []);

    const sendMessageToServer = (text) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            setIsLoading(true);
            wsRef.current.send(JSON.stringify({ message: text }));
        }
    };
    const handleStartListening = () => {
        setIsListening(true);
        recognition.continuous = true;
        recognition.start();
    };
    recognition.onresult = (event) => {
        const result = event.results[0];
        const text = result[0].transcript;

        if (result.isFinal) {
            // 최종 결과만 메시지로 설정하고 서버로 보냅니다.
            setMessages(prev => [{ type: 'user', content: text }, ...prev]);
            sendMessageToServer(text);
            recognition.stop();
            setIsListening(false);
        }
    };

    recognition.onend = () => {
        console.log("Speech recognition service disconnected.");
        setIsListening(false);
        // alert("계속 대화하시려면 마이크 버튼을 눌러주세요")
    };


    const handleServerResponse = (response) => {
        if(response.data==""){
            response.data = "test"
        }
        const data = response.data;
        setMessages(prev => [{ type: 'bot', content: data }, ...prev]);
        setIsSpeaking(true)

        const utterance = new SpeechSynthesisUtterance(data);
        utterance.lang = 'ko-KR';
        utterance.onend = () => {
            console.log("Speech synthesis finished.");
            setIsLoading(false);
            setIsListening(true);

            if (!isLoading) {  // 음성 출력이 끝나면 듣기 시작
                if(!isListening){
                    setIsSpeaking(false)
                    handleStartListening();
                }
            }
        };

        // 음성 출력 시작
        synth.speak(utterance);


                    handleStartListening();
            setIsLoading(false);
            setIsListening(true);
    };

    return (
        <Flex h="55vh" bg="gray.50" p="1" flexDirection="column" w="100%" pt="3vh" justifyContent="space-between">
            <Flex flex="1" bg="white" p={6} flexDirection="column" rounded="xl"  overflow="hidden" w="100%">
                {/* 메시지 영역 */}
                <Flex flex="1" flexDirection="column-reverse" overflowY="auto" >
                    <Box ref={messagesEndRef} />

                    {messages.map((message, index) => (
                        <Flex key={index} justify={message.type === 'user' ? 'flex-end' : 'flex-start'} mb={4}>
                            <Box maxW="70%" p={3} rounded="lg"
                                 bg={message.type === 'user' ? 'blue.500' : 'gray.100'}
                                 color={message.type === 'user' ? 'white' : 'gray.800'}>
                                {message.content}
                            </Box>
                        </Flex>
                    ))}

                </Flex>
            </Flex>

            {/* 하단 컨트롤 영역 */}
            <Flex mt={4} justify="center" align="center" gap={4} bg="white" p={4} rounded="lg" h="8vh">
                {isLoading && (
                    <Flex align="center" gap={2}>
                        <Spinner size="md" color="blue.500" />
                        <Box color="gray.600">CHATBOT{isSpeaking ? ' 응답 중...' : ' 응답 대기중...'}</Box>
                    </Flex>
                )}
                {isListening && (
                    <Flex align="center" gap={2}>
                        <Spinner size="md" color="red.500" />
                        <Box color="gray.600">사용자 응답 대기중...</Box>
                    </Flex>
                )}

                <Button onClick={handleStartListening} p={3} rounded="full" w="4vh" h="4vh"
                        bg={isListening||isLoading ? 'red.500' : 'blue.500'} className={isListening||isLoading ? 'animate-pulse' : ''}
                        _hover={{ bg: isListening||isLoading ? 'red.600' : 'blue.600' }}
                        disabled={isListening||isLoading}>
                    <MicIcon size={32} color="white"  />
                </Button>
            </Flex>
        </Flex>
    );
}

export default ChatFragment;
