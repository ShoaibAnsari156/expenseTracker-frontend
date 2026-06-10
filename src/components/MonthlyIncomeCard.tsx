import { ArrowUp, CircleDollarSign } from "lucide-react"

const MonthlyIncomeCard = ({monthlyIncome}:any) => {
    return (
        <div
            className="flex  justify-between p-3 bg-white rounded-md shadow-sm"
        >
            <CircleDollarSign className="w-7 h-7 bg-green-200 text-green-800 p-1 rounded" />

            <div className="flex-1 ml-2">
                <p className="text-lg text-gray-500">Monthly Income</p>
                <p className="font-bold text-xl">₹ {monthlyIncome.totalIncome}</p>
            </div>

            <ArrowUp className="w-7 h-7 bg-green-200 text-green-800 p-1 rounded" />
        </div>
    )
}

export default MonthlyIncomeCard