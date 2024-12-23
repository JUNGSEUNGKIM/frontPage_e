import { Line } from "react-chartjs-2";
// import faker from 'faker';

export default function LineChart({ lineColor }: { lineColor: string }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: false,
                text: "rPPG Measurement Result",
            },
        },
        scales: {
            // to remove the labels
            x: {
                ticks: {
                    display: false,
                },

                // to remove the x-axis grid
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            // to remove the y-axis labels
            y: {
                ticks: {
                    display: false,
                    beginAtZero: true,
                },
                // to remove the y-axis grid
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
        },
    };

    const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    const data = {
        labels,
        datasets: [
            {
                label: "HR",
                data: labels.map(() => Math.random() * 100),
                borderWidth: 3,
                borderColor: lineColor,
                fill: false,
                backgroundColor: "white",
                tension: 0.5,
                pointStyle: "line",
                pointBorderWidth: 0,
            },
            // {
            //     label: "HRV",
            //     data: labels.map(() => Math.random() * 100),
            //     borderColor: "blue",
            //     backgroundColor: "rgba(53, 162, 235, 0.5)",
            // },
            // {
            //     label: "Stress",
            //     data: labels.map(() => Math.random() * 100),
            //     borderColor: "orange",
            //     backgroundColor: "rgba(53, 162, 235, 0.5)",
            // },
        ],
    };

    return <Line options={options} data={data} />;
}
