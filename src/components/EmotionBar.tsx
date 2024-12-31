import React, { useState } from "react";

interface EmotionBarProps {
    emotions: {
        name: string; // 감정 이름
        color: string; // 감정을 표현할 색상
        value: number; // 감정 비율 (0~1, 전체 합이 1이어야 함)
    }[];
}

export const EmotionBar: React.FC<EmotionBarProps> = ({ emotions }) => {
    const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

    return (
        <div style={{ width: "25vw", padding: "20px" }}>
            {/* Graph */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "45px", // 막대 그래프 높이
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                {emotions.map((emotion, index) => (
                    <div
                        key={index}
                        style={{
                            width: `${emotion.value * 100}%`,
                            backgroundColor: emotion.color,
                            height: "100%",
                            transition: "opacity 0.3s",
                            opacity:
                                hoveredEmotion === null ||
                                hoveredEmotion === emotion.name
                                    ? 1
                                    : 0.5,
                        }}
                        onMouseEnter={() => setHoveredEmotion(emotion.name)}
                        onMouseLeave={() => setHoveredEmotion(null)}
                    />
                ))}
            </div>
            {/* Emotion Legend (Vertical Layout) */}
            <div
                style={{
                    marginTop: "10px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px", // 감정 아이템 간 간격
                    width: "100%",
                }}
            >
                {emotions.map((emotion, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {/* Circle */}
                        <div
                            style={{
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: emotion.color,
                                marginRight: "8px",
                            }}
                        ></div>
                        {/* Emotion Name */}
                        <span style={{ fontSize: "14px", color: "#333" }}>
                            {emotion.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
