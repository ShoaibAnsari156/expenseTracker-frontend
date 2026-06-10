import { ArrowDown, Wallet } from "lucide-react"

const MonthlyExpensesCard = ({monthlyExpense}:any) => {
    return (
        <div
            className="flex  justify-between p-3 bg-white rounded-md shadow-sm"
        >
            <Wallet className="w-7 h-7 bg-red-200 text-red-800 p-1 rounded" />

            <div className="flex-1 ml-2">
                <p className="text-lg text-gray-500">Monthly Expenses</p>
                <p className="font-bold text-xl">₹ {monthlyExpense.totalExpense}</p>
            </div>

            <ArrowDown className="w-7 h-7 bg-red-200 text-red-800 p-1 rounded" />
        </div>
    )
}

export default MonthlyExpensesCard