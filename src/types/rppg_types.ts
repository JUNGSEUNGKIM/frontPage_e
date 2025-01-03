// interface for RPPG Result
export interface RPPGMeasurement {
    hr: string;
    hrv: string;
    stress: string;
    emotion: string;
    emotionResult: {
        Angry: number;
        Disgusted: number;
        Fearful: number;
        Happy: number;
        Neutral: number;
        Sad: number;
        Surprised: number;
    };
}
