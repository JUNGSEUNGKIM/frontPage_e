
// export type Gender = "남성" | "여성"
// export type Exercise = "네" | "아니오";
// export type ExerciseFrequency = '없음' | '1~2회' | '3~5회' | '6회 이상';
// export type SleepHours = '4시간 이하' | '4~6시간' | '6~8시간' | '8시간 이상';
// export type SleepQuality = '매우 나쁨' | '나쁨' | '보통' | '좋음';
// export type StressLevel = '매우 낮음' | '낮음' | '보통' | '높음' | '매우 높음';
// export type VeryLow = '매우 낮음' | '낮음' | '보통' | '높음' | '매우 높음';
// export type EmotionalState = '부정적' | '중립적' | '긍정적';
// export type Medication = '없음' | '있음';

export type HealthSurveyResult = {
    member_id: number,
    gender: string,
    age: number,
    height: number,
    weight: number,
    regular_exercise: string,
    exercise_frequency: string,
    sleep_hours: string,
    sleep_quality: string,
    stress_level: string,
    emotional_state: string,
    existing_conditions: string,
    medication: string
}