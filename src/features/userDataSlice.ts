import { createSlice } from "@reduxjs/toolkit"

const userDataSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        transactions: []
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload
        }
    }
})

export const { setUserId, setTransactions } = userDataSlice.actions
export default userDataSlice.reducer