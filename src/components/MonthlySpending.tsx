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
    const data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Spending',
                data: [1,100,500,1000,1500,2000,2500,3000],
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
    return (
        <div className="bg-white rounded-md p-2 mt-4">
            <div className="flex justify-between items-center mb-2">
                <h1>Monthly Spending</h1>
                <p className="text-xs text-gray-500">Last 4 months</p>
            </div>
            <div className="h-52">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default MonthlySpending