import { RPPGMeasurement } from "./rppg_types";
import { DiagnosisType } from "./survey_types";

export interface DiagnosisReport {
    measurement: RPPGMeasurement;
    hrValues: string[];
    score: number;
    diagnosisType: DiagnosisType;
}

/// for Diagnosis Report
export interface DiagnosisCriteria {
    range: [number, number];
    label: string;
}

export const scoreCategories: Record<string, DiagnosisCriteria[]> = {
    Depression: [
        { range: [0, 10], label: "Normal" },
        { range: [11, 20], label: "Warning" },
        { range: [21, Infinity], label: "Danger" },
    ],
    Dementia: [
        { range: [0, 15], label: "Normal" },
        { range: [16, 30], label: "Warning" },
        { range: [31, Infinity], label: "Danger" },
    ],
};
