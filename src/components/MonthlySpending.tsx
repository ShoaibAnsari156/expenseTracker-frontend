import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { getLineGraphData } from '@/services/getRecordsService';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const MonthlySpending = () => {
    const userId: any = sessionStorage.getItem("userId")
    const [graphData, setGraphData] = useState([]);
    const toggleRefresh:Boolean = useSelector((state: any) => state.user.toggleRefresh)
    const data = {
        labels: graphData.map((data: any) => data.month),
        datasets: [
            {
                label: 'Spending',
                data: graphData.map((data: any) => data.total),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getLineGraphData(userId)
                setGraphData(response.data)
                console.log("line graph data", response);

            } catch (error) {
                console.log("Error in getting Line graph data", error);
            }
        })()
    }, [toggleRefresh])

    return (
        <div className="bg-white rounded-md p-2 mt-4">
            <div className="flex justify-between items-center mb-2">
                <h1>Monthly Spending</h1>
                <p className="text-xs text-gray-500">Last months</p>
            </div>
            <div className="h-52">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default MonthlySpending