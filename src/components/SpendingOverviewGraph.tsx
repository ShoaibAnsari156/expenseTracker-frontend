import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js";
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getDoughnutData } from "@/services/getRecordsService";
import { toast } from "sonner";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SpendingOverviewGraph = () => {
    const [selectedMonth, setSelectedMonth] = React.useState<string>(new Date().toISOString().slice(0, 7));
    const [doughnutdata, setDoughnutData] = React.useState({ categories: {} })
    // const doughnutData = useSelector((state: any) => state.user.transactions)
    // console.log("doughnutData", doughnutData);
    const userId: any = sessionStorage.getItem("userId")
    console.log("userId", userId);

    useEffect(() => {
        (async () => {
            try {
                const response = await getDoughnutData({ userId, date: selectedMonth })
                if (response.success) {
                    setDoughnutData((prev: any) => ({
                        ...prev,
                        categories: response.data.categories
                    }))
                }
                console.log("doughnut Data", response);

            } catch (error: any) {
                console.log("Error in getting Doughnut data", error);
                toast.error("Error!", error)
            }
        })()
    }, [selectedMonth])
    const chartData = {
        // labels: ['Food & Dining', "Housing", "Entertainment", "Utilities", 'Transport', 'Shopping'],
        // labels: doughnutData.map((data:any)=>(data.category)),
        // labels: doughnutData.filter((item: any, index: any, self: any) =>
        //     // Keeps the item only if its index matches the FIRST time it appears
        //     self.findIndex((t: any) => t.category === item.category) === index
        // ).map((data: any) => data.category),
        labels: Object.entries(doughnutdata.categories),
        datasets: [
            {
                data: Object.values(doughnutdata.categories),
                backgroundColor: ['#FF6384', '#36A2EB', "#EAB308", "#3B82F6", "#22C55E", "#F97316"],
                borderWidth: 1
            }
        ]
    };

    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
            tooltip: {
                padding: { top: 10, bottom: 10, left: 14, right: 14 },
                caretPadding: 6,
                boxPadding: 6,
                bodyFont: { size: 14 },
                backgroundColor: '#1e293b', // Tailwind slate-800 look
                cornerRadius: 6,
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((sum: number, curr: any) => sum + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return ` ${label}: ${percentage}% (RS ${value})`;
                    }
                }
            }
        },
        cutout: "60%"
    };
    return (
        <div className="bg-white rounded-md p-4 w-full shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800">Spending Overview</h2>
                <input
                    type="month"
                    className="border rounded px-2 py-1 text-sm outline-none"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
            </div>

            {/* Layout Container */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Chart Section */}
                <div className="h-44 w-auto">
                    <Doughnut data={chartData} options={options} />
                </div>

                {/* Custom Legend Section: Two columns side by side */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-sm">
                    {chartData.labels.map((label: any, index: any) => (
                        <div key={label} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                            />
                            <span className="text-sm text-gray-600 truncate">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpendingOverviewGraph;
