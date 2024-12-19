import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "rPPG Measurement Result",
        },
    },
};

const labels = ["1", "2", "3", "4", "5", "6"];

export const data = {
    labels,
    datasets: [
        {
            label: "HR",
            data: labels.map(() => Math.random() * 100),
            borderColor: "red",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "HRV",
            data: labels.map(() => Math.random() * 100),
            borderColor: "blue",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
            label: "Stress",
            data: labels.map(() => Math.random() * 100),
            borderColor: "orange",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function LineChart() {
    return <Line options={options} data={data} />;
}
