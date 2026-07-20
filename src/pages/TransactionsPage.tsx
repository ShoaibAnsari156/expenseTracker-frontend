// import { getFullTransactionsList } from "@/services/transactionsService"
// import type { Transaction } from "@/types"
// import { useEffect, useState } from "react"

// const TransactionsPage = () => {
//     const id: Number = Number(sessionStorage.getItem("userId"))
//     const [AllTransactions, setAllTransactions] = useState([]);
//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await getFullTransactionsList(id)
//                 // console.log("transactions", response.data.transactions);
//                 if (response.success) {
//                     // toast.success(`${response.message}`)
//                     setAllTransactions(response.data.transactions)
//                     // console.log(AllTransactions);

//                 }
//             } catch (error) {
//                 console.log("Error when getting transaction list", error)
//             }
//         })()
//     }, [])
//     return (
//         <div className="flex justify-center items-center">
//             <table className="border-2 border-black shadow-2xl h-1/2 overflow-y-auto mt-4">
//                 <thead className="bg-gray-400 border-b-2 border-gray-700">
//                     <tr>
//                         <th className="border-r-2 border-black p-2">Title</th>
//                         <th className="border-r-2 border-black p-2">Date</th>
//                         <th className="p-2">Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {AllTransactions.map((transaction:Transaction) =>
//                         <tr className="border-b-2 border-black">
//                             <td className="border-r-2 border-black p-2 text-center">{transaction.title}</td>
//                             <td className="border-r-2 border-black p-2 text-center">{transaction.date}</td>
//                             <td className="border-r-2 border-black p-2 text-center">{transaction.amount}</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default TransactionsPage
import { getFullTransactionsList } from "@/services/transactionsService"
import type { Transaction } from "@/types"
import { useEffect, useState } from "react"

const TransactionsPage = () => {
    const id = Number(sessionStorage.getItem("userId"))
    // 1. Properly typed state prevents implicit 'any' bugs
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
    useEffect(() => {
        (async () => {
            try {
                const response = await getFullTransactionsList(id)
                if (response.success && response.data?.transactions) {
                    setAllTransactions(response.data.transactions)
                }
            } catch (error) {
                console.error("Error when getting transaction list", error)
            }
        })()
    }, [id]) // Included 'id' in dependency array as a best practice

    return (
        // Flex container takes full viewport height to center the element nicely
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">

            {/* 
              This wrapper container is the secret to fixing your scrollbar issue.
              - 'max-h-[80vh]' keeps it at approximately screen size.
              - 'w-full max-w-4xl' keeps the table appropriately sized.
              - 'overflow-auto' anchors the scrollbar perfectly to this container's edges.
            */}
            <div className="w-full max-w-4xl max-h-[80vh] overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-gray-100 z-10 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 ">Category</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {allTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-400 text-sm">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            allTransactions.map((transaction: Transaction, index) => (
                                // Added the required unique 'key' prop to eliminate React warnings
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm font-medium text-gray-800">{transaction.title}</td>
                                    <td className="p-4 text-sm text-gray-500">{transaction.date}</td>
                                    <td className="p-4 text-sm text-gray-500">{transaction.category}</td>
                                    {/* Amounts are traditionally right-aligned for better visual column readability */}
                                    <td className={`p-4 text-sm font-semibold text-right ${transaction.category === "Income" ? "text-green-400" : "text-gray-900"}`}>
                                        {transaction.category === "Income" ? "+ " : "-"}
                                        {Number(transaction.amount).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TransactionsPage