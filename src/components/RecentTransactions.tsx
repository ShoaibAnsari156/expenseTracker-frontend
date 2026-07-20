import type { TrasactionListType } from "@/types"
import { useSelector } from "react-redux"


const RecentTransactions = () => {
    const transactions = useSelector((state: any) => state.user.transactions)
    // console.log("Recent transactions", transactions);
    return (
        <div>
            <div className="bg-white rounded-md p-2">
                <div className="flex">
                    <h2 className="font-medium mb-2">Recent Transactions</h2>
                    <p className="ml-2 text-sm">(Last 5 Transactions)</p>
                </div>
                {transactions.map((item: TrasactionListType, index: number) => (
                    <div
                        key={index}
                        className="grid grid-cols-[50px_1fr_80px_100px] items-center gap-3"
                    >
                        {/* Icon */}
                        <img src="transaction.jpg" alt="Expense Tracker" className="h-10 w-10 border border-gray-200 rounded-full" />

                        {/* Name + Category */}
                        <div className="min-w-0">
                            <h3 className="font-semibold text-sm truncate">
                                {item.title}
                            </h3>

                            <p className="text-xs text-gray-500 truncate">
                                {item.category}
                            </p>
                        </div>

                        {/* Date */}
                        <p className="text-sm text-gray-500 text-center whitespace-nowrap">
                            {item.date}
                        </p>

                        {/* Amount */}
                        <p
                            className={`text-sm font-semibold text-right whitespace-nowrap tabular-nums ${item.category.toLowerCase() === "income"
                                ? "text-green-600"
                                : "text-black"
                                }`}
                        >
                            {`${item.category === "Income" ? "+" : "-"} ${item.amount}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions