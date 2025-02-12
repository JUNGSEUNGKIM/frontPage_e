import { useCallback, useEffect, useRef, useState } from "react";
import * as faceMesh from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import cv from "@techstark/opencv-js";
import { RPPGMeasurement } from "@/types/rppg_types.ts";
import { Flex } from "@chakra-ui/react";
import { io } from "socket.io-client";

type SOCKETURL = "ws://localhost:3000/api/ws" | "ws://121.133.205.103:5050/ws";

const currentURL: SOCKETURL = "http://localhost:3000/ws";

const FaceDetectionApp = ({
                              onValueChanged,
                          }: {
    onValueChanged: (newValue: RPPGMeasurement) => void;
}) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
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

    const sendBatch = useCallback(() => {
        if (!socketRef.current) return;

        if (imageBufferRef.current.length > 0) {
            const batch = {
                timestamp: Date.now(),
                images: imageBufferRef.current,
            };
            socketRef.current.emit("message", batch);
            // socketRef.current.emit("message", {
            //     type: "batch",
            //     timestamp: Date.now(),
            //     images: imageBufferRef.current,
            // });
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
        socketRef.current = io(currentURL, { transports: ['websocket'] });

        frameCountRef.current = 0;
        lastEmotionSendTimeRef.current = Date.now();

        if (socketRef.current === null) return;

        socketRef.current.on("connect", () => {
            console.log("Socket.IO 연결됨");
        });

        socketRef.current.on("message", (event) => {
            try {
                const response = JSON.parse(event);
                console.log("서버로부터 응답 받음:", response);

                if (response.message === "Measurement received successfully") {
                    console.log(response.message);
                    onValueChanged({
                        hr: response.result.hr as string,
                        hrv: response.result.hrv as string,
                        emotion: response.result.emotion as string,
                        stress: response.result.stress as string,
                        emotionResult: response.result.emotion_result,
                    });
                } else {
                    console.error("분석 실패:", response.message);
                }
            } catch (error) {
                console.error("응답 처리 중 에러:", error);
            }
        });

        socketRef.current.on("disconnect", () => {
            console.log("Socket.IO 연결 닫힘");
        });

        socketRef.current.on("connect_error", (error) => {
            console.error("Socket.IO 에러:", error);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
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
            if (!socketRef.current) return;

            try {
                const width = bounds.maxX - bounds.minX;
                const height = bounds.maxY - bounds.minY;

                if (width <= 0 || height <= 0) {
                    console.error("Invalid crop dimensions:", width, height);
                    return;
                }

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

                const resizedRoi = new cv.Mat();
                const resizedMask = new cv.Mat();

                cv.resize(
                    roi,
                    resizedRoi,
                    new cv.Size(FIXED_OUTPUT_SIZE.width, FIXED_OUTPUT_SIZE.height),
                    0,
                    0,
                    cv.INTER_AREA
                );
                cv.resize(
                    roiMask,
                    resizedMask,
                    new cv.Size(FIXED_OUTPUT_SIZE.width, FIXED_OUTPUT_SIZE.height),
                    0,
                    0,
                    cv.INTER_AREA
                );

                const whiteBg = new cv.Mat(
                    FIXED_OUTPUT_SIZE.height,
                    FIXED_OUTPUT_SIZE.width,
                    cv.CV_8UC3,
                    new cv.Scalar(255, 255, 255)
                );

                const finalFace = new cv.Mat();
                resizedRoi.copyTo(finalFace);
                finalFace.copyTo(whiteBg, resizedMask);

                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = FIXED_OUTPUT_SIZE.width;
                tempCanvas.height = FIXED_OUTPUT_SIZE.height;
                cv.imshow(tempCanvas, whiteBg);

                const imageData = tempCanvas
                    .toDataURL("image/jpeg", 0.8)
                    .split(",")[1];

                imageBufferRef.current.push({
                    timestamp: Date.now(),
                    data: imageData,
                });

                const currentTime = Date.now();
                if (frameCountRef.current % 150 === 0) {
                    const emotionPayload = {
                        timestamp: Date.now(),
                        emotionImg: imageData,
                    };
                    socketRef.current.emit("message", emotionPayload);
                    lastEmotionSendTimeRef.current = currentTime;
                }

                if (imageBufferRef.current.length === 1) {
                    timeoutIdRef.current = setTimeout(sendBatch, BATCH_INTERVAL);
                }

                roi.delete();
                resizedRoi.delete();
                roiMask.delete();
                resizedMask.delete();
                finalFace.delete();
                whiteBg.delete();
            } catch (error) {
                console.error("Error in sendFaceRegion:", error);
            }
        },
        [sendBatch]
    );

    const onResults = (results) => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvasCtx = canvasRef.current.getContext("2d");

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        canvasCtx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

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

                if (
                    frameCountRef.current % 150 ===
                    0
                ) {
                    const result = new cv.Mat();
                    src.copyTo(result, mask);

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
                return `/lucycare/face_mesh/${file}`;
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
            <canvas ref={canvasRef} style={{ borderRadius: "8px" }} />
        </Flex>
    );
};

export default FaceDetectionApp;
