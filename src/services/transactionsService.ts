import type { TrasactionListType } from "@/types"
import { apiHandler } from "@/utils/fetchHelper"

export const getTransactionsList = async (id: number) => {
    return await apiHandler(`/api/v1/transactions/${id}/getTransactions`, {
        method: "GET",
    })
}

export const getFullTransactionsList = async (id: Number) => {
    return await apiHandler(`/api/v1/transactions/${id}/getFulltransactions`, {
        method: "GET",
    })
}
export const addTransaction = async (transactionData: TrasactionListType, userId: any) => {
    return await apiHandler(`/api/v1/transactions/addTransaction`, {
        method: "POST",
        body: {
            ...transactionData,
            userId
        }
    })
}