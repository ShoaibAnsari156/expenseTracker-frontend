import { apiHandler } from "@/utils/fetchHelper"

export const getCurrentAmountStatus = async (id: number) => {
    return await apiHandler(`/api/v1/records/${id}/amountStatus`,
        {
            method: "GET"
        }
    )
}

export const getDoughnutData = async ({ userId, date }: { userId: Number, date: String }) => {
    return await apiHandler(`/api/v1/records/singleMonthOverview?userId=${userId}&date=${date}`, { method: "GET" })
}
export const getLineGraphData = async (userId: Number) => {
    return await apiHandler(`/api/v1/records/${userId}/monthlySpendingdetails`)
}