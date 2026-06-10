import { apiHandler } from "@/utils/fetchHelper"

export const getTransactionsList = async (id: number) => {
    return await apiHandler(`/api/v1/transactions/getTransactions/${id}`, {
        method: "GET",
    })
}

export const addTransaction = async (transactionData: any, userId: any) => {
    return await apiHandler(`/api/v1/transactions/addTransaction`, {
        method: "POST",
        body: {
            ...transactionData,
            userId
        }
    })
}