import { DiagnosisType } from "@/shared/types/survey_types";

export type DiagnosisResult = {
    measurement: RPPGMeasurement;
    hrValues: string[];
    score: number;
    diagnosisType: DiagnosisType;
};

// type for RPPG Result
type RPPGMeasurement = {
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
};
