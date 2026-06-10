import { apiHandler } from "@/utils/fetchHelper"

export const addBalance = async (userId: number, balance: number) => {
    return await apiHandler(`/api/v1/transactions/updateBalance`,
        {
            method: "POST",
            body: {
                userId,
                totalBalance: balance
            }
        }
    )
}