import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TransactionAPIPayoll from '../../apis/TransactionPayOll.Api';

const initialState = {
    transaction: "",
    status: 'idle',
    error: null
};

export const getTransactionHistorys = createAsyncThunk("PayOll/getTransactionHistory", async () => {
    const res = await TransactionAPIPayoll.getTransactionHistory()
    console.log(res)
    // return res.data
})

export const getTransactionHistoryByIds = createAsyncThunk("PayOll/getTransactionHistoryById", async () => {
    const res = await TransactionAPIPayoll.getTransactionHistoryById()
})

export const getAllTransactions = createAsyncThunk("PayOll/getAllTransaction", async () => {
    const res = await TransactionAPIPayoll.getAllTransaction()
})

export const getTotalTransactions = createAsyncThunk("PayOll/getTotalTransaction", async () => {
    const res = await TransactionAPIPayoll.getTotalTransaction()
})

export const reviewTransactions = createAsyncThunk("PayOll/reviewTransaction", async () => {
    const res = await TransactionAPIPayoll.reviewTransaction()
})

export const submitTransactions = createAsyncThunk("PayOll/submitTransaction", async () => {
    const res = await TransactionAPIPayoll.submitTransaction()
})

export const changesTransactionStatus = createAsyncThunk("PayOll/changeTransactionStatus", async () => {
    const res = await TransactionAPIPayoll.changeTransactionStatus()
})

export const TransactionSlice = createSlice({
    name: "transaction",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getTransactionHistorys.fulfilled, (state, action) => {
                state.status = "success"
                // state.admin = action.payload
            })
            .addCase(getTransactionHistoryByIds.fulfilled, (state, action) => {
                state.status = "success"
            })
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.status = "success"
            })
            .addCase(getTotalTransactions.fulfilled, (state, action) => {
                state.status = "success"
            })
            .addCase(reviewTransactions.fulfilled, (state, action) => {
                state.status = "success"
            })
            .addCase(submitTransactions.fulfilled, (state, action) => {
                state.status = "success"
            })
            .addCase(changesTransactionStatus.fulfilled, (state, action) => {
                state.status = "success"
            })
    }
})

export default TransactionSlice.reducer 