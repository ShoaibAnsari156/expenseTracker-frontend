import { createSlice } from "@reduxjs/toolkit"

const userDataSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        transactions: [],
        doughnutData: {},
        toggleRefresh: false
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload
        },
        setDoughnutData: (state, action) => {
            state.doughnutData = action.payload
        },
        setToggleRefresh: (state, action) => {
            state.toggleRefresh = action.payload
        }
    }
})

export const { setUserId, setTransactions, setDoughnutData, setToggleRefresh } = userDataSlice.actions
export default userDataSlice.reducer