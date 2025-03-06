import { useTranslation } from "react-i18next";
import { DiagnosisResult } from "../types";
import HRVIcon from "@/assets/hrv.png";

interface HRVResultCardProps {
    state: DiagnosisResult;
}

export default function HRVResultCard({ state }: HRVResultCardProps) {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === "en";

    return (
        <div className="w-full h-[28rem] flex flex-col rounded-xl border bg-card text-card-foreground shadow p-4">
            <h3 className="font-bold text-lg mb-4">
                {t("rppgHRVLabel") + " (SDNN Index)"}
            </h3>
            <div className="w-full h-full flex flex-row gap-4">
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-4">
                    <div className="flex flex-row items-center justify-center mb-4 px-10 gap-4">
                        <img src={HRVIcon} className="w-20" />
                        <span className="w-1/2 text-8xl font-bold text-blue-500 text-center">
                            {state.measurement.hrv}
                        </span>
                        <span className="text-4xl font-bold text-blue-500">
                            ms
                        </span>
                    </div>
                    <span className="text-sm text-slate-400 text-center">
                        {t("hrvDescription")}
                    </span>
                </div>
                <div className="h-full flex flex-col items-center justify-center">
                    <h1 className="text-sm font-medium">
                        {isEnglish ? "HRV (SDNN Index) Risk Classification" : "HRV(SDNN Index) 수치에 따른 위험도 구분표"}
                    </h1>
                    <SDNNTable isEnglish={isEnglish} />
                </div>
            </div>
        </div>
    );
}

const SDNNTable = ({ isEnglish }: { isEnglish: boolean }) => {
    const data = [
        {
            age: "10-29",
            gender: isEnglish ? "M" : "M",
            normal: isEnglish ? "≥ 68" : "68 이상",
            caution: isEnglish ? "48 - 67" : "48 이상 ~ 68 미만",
            risk: isEnglish ? "< 48" : "48 미만",
        },
        {
            age: "10-29",
            gender: isEnglish ? "F" : "F",
            normal: isEnglish ? "≥ 48" : "48 이상",
            caution: isEnglish ? "30 - 47" : "30 이상 ~ 48 미만",
            risk: isEnglish ? "< 30" : "30 미만",
        },
        {
            age: "30-49",
            gender: "M",
            normal: isEnglish ? "≥ 51" : "51 이상",
            caution: isEnglish ? "37 - 50" : "37 이상 ~ 51 미만",
            risk: isEnglish ? "< 37" : "37 미만",
        },
        {
            age: "30-49",
            gender: "F",
            normal: isEnglish ? "≥ 45" : "45 이상",
            caution: isEnglish ? "32 - 44" : "32 이상 ~ 45 미만",
            risk: isEnglish ? "< 32" : "32 미만",
        },
        {
            age: "50-69",
            gender: isEnglish ? "M/F (No distinction)" : "M/F (구분X)",
            normal: isEnglish ? "≥ 33" : "33 이상",
            caution: isEnglish ? "19 - 32" : "19 이상 ~ 33 미만",
            risk: isEnglish ? "< 19" : "19 미만",
        },
        {
            age: "70-",
            gender: isEnglish ? "M/F (No distinction)" : "M/F (구분X)",
            normal: isEnglish ? "≥ 30" : "30 이상",
            caution: isEnglish ? "19 - 29" : "19 이상 ~ 30 미만",
            risk: isEnglish ? "< 19" : "19 미만",
        },
    ];

    return (
        <div className="flex flex-col p-4 text-[13px] gap-2">
            <div className="w-full flex flex-row justify-end">
                <span className="text-[12px] font-bold">{isEnglish ? "Unit (ms)" : "단위(ms)"}</span>
            </div>
            <table className="w-full border-collapse border border-gray-300 shadow-lg">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="border border-gray-300 px-4 py-2">
                            {isEnglish ? "Age" : "연령"}
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            {isEnglish ? "Gender" : "성별"}
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            {isEnglish ? "Normal" : "정상"}
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            {isEnglish ? "Caution" : "주의"}
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            {isEnglish ? "Risk" : "위험"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="text-center even:bg-gray-100"
                        >
                            <td className="border border-gray-300 px-4 py-2">
                                {row.age}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {row.gender}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                                {row.normal}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-yellow-600 font-semibold">
                                {row.caution}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">
                                {row.risk}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <span className="text-[10px] font-medium text-slate-500">
                {isEnglish
                    ? "The provided HRV risk classification table is for reference only. For an accurate diagnosis, please consult a medical institution."
                    : "제공된 HRV 위험도 기준표는 참고용으로서, 정확한 진단은 반드시 의료기관에서 받으시기 바랍니다."}
            </span>
        </div>
    );
};
