import MonthlyExpensesCard from "@/components/MonthlyExpensesCard"
import MonthlyIncomeCard from "@/components/MonthlyIncomeCard"
import MonthlySpending from "@/components/MonthlySpending"
import RecentTransactions from "@/components/RecentTransactions"
import SpendingOverviewGraph from "@/components/SpendingOverviewGraph"
import TotalBalanceCard from "@/components/TotalBalanceCard"
import { setTransactions } from "@/features/userDataSlice"
import { getCurrentAmountStatus } from "@/services/getRecordsService"
import { getTransactionsList } from "@/services/transactionsService"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const [allAmounts, setAllAmounts] = useState({});
  const id: any = sessionStorage.getItem("userId")
  const dispatch = useDispatch()
  const transactions = useSelector((state: any) => state.user.transactions)
  const toggleRefresh: Boolean = useSelector((state: any) => state.user.toggleRefresh)
  useEffect(() => {
    (async () => {
      try {
        const response = await getTransactionsList(id)
        // console.log("transactions", response);
        if (response.success) {
          // toast.success(`${response.message}`)
          dispatch(setTransactions(response.data?.transactions || []))
        }
      } catch (error) {
        console.log("Error when getting transaction list", error)
      }
    })()
  }, [toggleRefresh])

  useEffect(() => {
    const getAllAmount = async () => {
      try {
        const response = await getCurrentAmountStatus(id)
        if (response.success) {
          setAllAmounts(response.data)
        }
      } catch (error) {
        console.log("Error while getting current amount status", error);
      }
    }
    getAllAmount();
  }, [transactions])

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
          <TotalBalanceCard currentBalance={allAmounts} setAllAmounts={setAllAmounts} />
          <MonthlyIncomeCard monthlyIncome={allAmounts} />
          <MonthlyExpensesCard monthlyExpense={allAmounts} />
        </div>
        <div className="flex-1 overflow-y-auto min-h-0 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SpendingOverviewGraph />
            <RecentTransactions />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MonthlySpending />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home