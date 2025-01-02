// TODO: Change canvas size
// TODO: Analysis code
import { useCallback, useEffect, useRef, useState } from "react";
import * as faceMesh from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import cv from "@techstark/opencv-js";
import { RPPGMeasurement } from "@/types/rppg_types";
import { Flex } from "@chakra-ui/react";

type SOCKETURL = "ws://localhost:5050/ws" | "ws://121.133.205.103:5050/ws";

const currentURL: SOCKETURL = "ws://121.133.205.103:5050/ws";

const FaceDetectionApp = ({
    onValueChanged,
}: {
    onValueChanged: (newValue: RPPGMeasurement) => void;
}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const skinCanvasRef = useRef(null);
    const [isMirrored, setIsMirrored] = useState(false);
    const socketRef = useRef(null);
    const frameCountRef = useRef(0);
    const lastEmotionSendTimeRef = useRef(Date.now());
    const matPointsRef = useRef(null);
    const matVectorRef = useRef(null);
    const BATCH_INTERVAL = 5000; // 5초
    const imageBufferRef = useRef([]);
    const timeoutIdRef = useRef(null);
    const FIXED_OUTPUT_SIZE = {
        width: 154, // 원하는 출력 크기로 조정
        height: 154,
    };

    // 브라우저 크기 감지

    const sendBatch = useCallback(() => {
        if (
            !socketRef.current ||
            socketRef.current.readyState !== WebSocket.OPEN
        )
            return;

        if (imageBufferRef.current.length > 0) {
            const batch = {
                timestamp: Date.now(),
                images: imageBufferRef.current,
            };
            socketRef.current.send(JSON.stringify(batch));
            imageBufferRef.current = []; // 버퍼 비우기
        }
    }, []);
    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
                sendBatch(); // 남은 데이터 전송
            }
        };
    }, [sendBatch]);

    useEffect(() => {
        // socketRef.current = new WebSocket("ws://localhost:5050/ws");
        socketRef.current = new WebSocket(currentURL);

        frameCountRef.current = 0;
        lastEmotionSendTimeRef.current = Date.now();

        if (socketRef.current === null) return;

        socketRef.current.onopen = () => {
            console.log("WebSocket 연결됨");
        };

        socketRef.current.onmessage = (event) => {
            try {
                // JSON 형태의 응답 파싱
                const response = JSON.parse(event.data);
                console.log("서버로부터 응답 받음:", response);

                // setAnalysisResult(response);

                if (response.message === "Measurement received successfully") {
                    // 성공적으로 분석 완료
                    console.log(response.message);
                    console.log("추천 색상:", response.result.hr);
                    // change rppg values
                    onValueChanged({
                        hr: response.result.hr as string,
                        hrv: response.result.hrv as string,
                        emotion: response.result.emotion as string,
                        stress: response.result.stress as string,
                    });
                } else {
                    // 에러 처리
                    console.error("분석 실패:", response.message);
                }
            } catch (error) {
                console.error("응답 처리 중 에러:", error);
            }
        };

        socketRef.current.onclose = () => {
            console.log("WebSocket 연결 닫힘");
        };

        socketRef.current.onerror = (error) => {
            console.error("WebSocket 에러:", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const drawFaceBoundingBox = (canvasCtx, landmarks, width, height) => {
        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;

        landmarks.forEach((landmark) => {
            const x = landmark.x * width;
            const y = landmark.y * height;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });

        const padding = 20;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(width, maxX + padding);
        maxY = Math.min(height, maxY + padding);

        canvasCtx.strokeStyle = "#0022ff";
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    };

    const sendFaceRegion = useCallback(
        (src, mask, bounds) => {
            if (
                !socketRef.current ||
                socketRef.current.readyState !== WebSocket.OPEN
            )
                return;

            try {
                // 얼굴 영역의 크기 계산
                const width = bounds.maxX - bounds.minX;
                const height = bounds.maxY - bounds.minY;

                // 크롭할 영역이 유효한지 확인
                if (width <= 0 || height <= 0) {
                    console.error("Invalid crop dimensions:", width, height);
                    return;
                }

                // 얼굴 영역만 크롭
                const roi = src.roi(
                    new cv.Rect(
                        Math.floor(bounds.minX),
                        Math.floor(bounds.minY),
                        Math.floor(width),
                        Math.floor(height)
                    )
                );

                const roiMask = mask.roi(
                    new cv.Rect(
                        Math.floor(bounds.minX),
                        Math.floor(bounds.minY),
                        Math.floor(width),
                        Math.floor(height)
                    )
                );

                // 리사이즈를 위한 새로운 Mat 생성
                const resizedRoi = new cv.Mat();
                const resizedMask = new cv.Mat();

                // 이미지와 마스크를 고정된 크기로 리사이즈
                cv.resize(
                    roi,
                    resizedRoi,
                    new cv.Size(
                        FIXED_OUTPUT_SIZE.width,
                        FIXED_OUTPUT_SIZE.height
                    ),
                    0,
                    0,
                    cv.INTER_AREA
                );
                cv.resize(
                    roiMask,
                    resizedMask,
                    new cv.Size(
                        FIXED_OUTPUT_SIZE.width,
                        FIXED_OUTPUT_SIZE.height
                    ),
                    0,
                    0,
                    cv.INTER_AREA
                );

                // 흰색 배경의 Mat 생성 (고정된 크기)
                const whiteBg = new cv.Mat(
                    FIXED_OUTPUT_SIZE.height,
                    FIXED_OUTPUT_SIZE.width,
                    cv.CV_8UC3,
                    new cv.Scalar(255, 255, 255)
                );

                // 리사이즈된 얼굴 부분만 복사
                const finalFace = new cv.Mat();
                resizedRoi.copyTo(finalFace);

                // 마스크를 이용해 얼굴 부분만 흰색 배경에 복사
                finalFace.copyTo(whiteBg, resizedMask);

                // tempCanvas 생성 및 크기 설정
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = FIXED_OUTPUT_SIZE.width;
                tempCanvas.height = FIXED_OUTPUT_SIZE.height;
                cv.imshow(tempCanvas, whiteBg);

                const imageData = tempCanvas
                    .toDataURL("image/jpeg", 0.8)
                    .split(",")[1];
                // socketRef.current.send(imageData);
                imageBufferRef.current.push({
                    timestamp: Date.now(),
                    data: imageData,
                });
                const currentTime = Date.now();
                if (
                    frameCountRef.current % 150 ===
                    0 // 30프레임 중 1프레임 선택
                ) {
                    if (
                        socketRef.current &&
                        socketRef.current.readyState === WebSocket.OPEN
                    ) {
                        const emotionPayload = {
                            timestamp: Date.now(),
                            emotionImg: imageData,
                        };
                        socketRef.current.send(JSON.stringify(emotionPayload));
                    }
                    lastEmotionSendTimeRef.current = currentTime;
                    frameCountRef.current++;
                }

                if (imageBufferRef.current.length === 1) {
                    timeoutIdRef.current = setTimeout(
                        sendBatch,
                        BATCH_INTERVAL
                    );
                }

                // 메모리 정리
                roi.delete();
                resizedRoi.delete();
                roiMask.delete();
                resizedMask.delete();
                finalFace.delete();
                // croppedFace.delete();
                whiteBg.delete();
            } catch (error) {
                console.error("Error in sendFaceRegion:", error);
            }
        },
        [sendBatch]
    );

    const onResults = (results) => {
        if (!canvasRef.current || !videoRef.current) return;
        // if (!canvasRef.current || !skinCanvasRef.current || !videoRef.current)
        //     return;

        const canvasCtx = canvasRef.current.getContext("2d");

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        canvasCtx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        // setIsFaceDetected(results.multiFaceLandmarks?.length > 0);

        canvasCtx.save();

        if (isMirrored) {
            canvasCtx.scale(-1, 1);
            canvasCtx.translate(-canvasRef.current.width, 0);
        }

        canvasCtx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        canvasCtx.restore();
        canvasCtx.save();

        if (
            results.multiFaceLandmarks &&
            results.multiFaceLandmarks.length > 0
        ) {
            const landmarks = results.multiFaceLandmarks[0];

            canvasCtx.restore();
            canvasCtx.save();
            if (isMirrored) {
                canvasCtx.scale(-1, 1);
                canvasCtx.translate(-canvasRef.current.width, 0);
            }

            // 얼굴 영역 계산
            const bounds = {
                minX: canvasRef.current.width,
                minY: canvasRef.current.height,
                maxX: 0,
                maxY: 0,
            };

            landmarks.forEach((landmark) => {
                const x =
                    (isMirrored ? 1 - landmark.x : landmark.x) *
                    canvasRef.current.width;
                const y = landmark.y * canvasRef.current.height;
                bounds.minX = Math.max(0, Math.min(bounds.minX, x));
                bounds.minY = Math.max(0, Math.min(bounds.minY, y));
                bounds.maxX = Math.min(
                    canvasRef.current.width,
                    Math.max(bounds.maxX, x)
                );
                bounds.maxY = Math.min(
                    canvasRef.current.height,
                    Math.max(bounds.maxY, y)
                );
            });

            // 패딩 추가
            const padding = 0;
            bounds.minX = Math.max(0, bounds.minX - padding);
            bounds.minY = Math.max(0, bounds.minY - padding);
            bounds.maxX = Math.min(
                canvasRef.current.width,
                bounds.maxX + padding
            );
            bounds.maxY = Math.min(
                canvasRef.current.height,
                bounds.maxY + padding
            );

            drawFaceBoundingBox(
                canvasCtx,
                landmarks,
                canvasRef.current.width,
                canvasRef.current.height
            );

            const src = cv.imread(canvasRef.current);
            const mask = new cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC1);

            try {
                const adjustX = (x) => (isMirrored ? 1 - x : x);

                const outlineIndices = [
                    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
                    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
                    172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10,
                ];

                const points = outlineIndices.map(
                    (index) =>
                        new cv.Point(
                            adjustX(landmarks[index].x) * src.cols,
                            landmarks[index].y * src.rows
                        )
                );

                matPointsRef.current = cv.matFromArray(
                    points.length,
                    1,
                    cv.CV_32SC2,
                    [].concat(...points.map((p) => [p.x, p.y]))
                );
                matVectorRef.current = new cv.MatVector();
                matVectorRef.current.push_back(matPointsRef.current);

                cv.fillPoly(mask, matVectorRef.current, new cv.Scalar(255));

                const excludeRegions = [
                    [230, 226, 53, 55, 245],
                    [450, 465, 285, 282, 446],
                    [2, 98, 168, 327],
                    [18, 57, 37, 267, 287, 287],
                ];

                frameCountRef.current++;

                // 감정 이미지 전송 로직
                if (
                    frameCountRef.current % 150 ===
                    0 // 150프레임 중 1프레임 선택
                ) {
                    const result = new cv.Mat();
                    src.copyTo(result, mask);

                    // 크롭된 얼굴 영역만 전송
                    sendFaceRegion(src, mask, bounds);
                }
                excludeRegions.forEach((indices) => {
                    const regionPoints = indices.map(
                        (index) =>
                            new cv.Point(
                                adjustX(landmarks[index].x) * src.cols,
                                landmarks[index].y * src.rows
                            )
                    );
                    const regionMatPoints = cv.matFromArray(
                        regionPoints.length,
                        1,
                        cv.CV_32SC2,
                        [].concat(...regionPoints.map((p) => [p.x, p.y]))
                    );
                    const regionVector = new cv.MatVector();
                    regionVector.push_back(regionMatPoints);
                    cv.fillPoly(mask, regionVector, new cv.Scalar(0));
                    regionMatPoints.delete();
                    regionVector.delete();
                });

                const result = new cv.Mat();
                src.copyTo(result, mask);

                // 크롭된 얼굴 영역만 전송
                sendFaceRegion(src, mask, bounds);

                result.delete();
            } catch (error) {
                console.error("Error in onResults:", error);
            } finally {
                src.delete();
                mask.delete();
                if (matPointsRef.current) {
                    matPointsRef.current.delete();
                    matPointsRef.current = null;
                }
                if (matVectorRef.current) {
                    matVectorRef.current.delete();
                    matVectorRef.current = null;
                }
            }
        }

        canvasCtx.restore();
    };

    useEffect(() => {
        const faceMeshModel = new faceMesh.FaceMesh({
            locateFile: (file) => {
                // return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
                return `/face_mesh/${file}`;
            },
        });

        faceMeshModel.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceMeshModel.onResults(onResults);

        if (videoRef.current) {
            const camera = new Camera(videoRef.current, {
                onFrame: async () => {
                    await faceMeshModel.send({ image: videoRef.current });
                },
                // width: window.innerWidth * 0.5,
                // height: window.innerHeight * 0.2,
                width: 640,
                height: 480,
            });
            camera.start();

            return () => {
                camera.stop();
            };
        }
    }, []);

    return (
        <Flex justify="center" align="center" width="100%">
            <video
                ref={videoRef}
                style={{ display: "none" }}
                autoPlay
                playsInline
            />
            {/* canvas for detect check */}
            <canvas ref={canvasRef} style={{ borderRadius: "8px" }} />
            {/* canvas for skin extract */}
            {/*<canvas ref={skinCanvasRef} style={{ display: "none" }} />*/}
        </Flex>
    );
};

export default FaceDetectionApp;
