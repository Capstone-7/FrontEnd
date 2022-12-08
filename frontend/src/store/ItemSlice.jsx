import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import APIPayoll from '../apis/PayOll.Api';

const initialState = {
    admin: [],
    status: 'idle',
    error: null
};

export const getAllUsers = createAsyncThunk("PayOll/getAllUsers", async () => {
    const res = await APIPayoll.getAllUser()
    console.log(res)
    // return res.data.todos
})

export const getProductAlls = createAsyncThunk("PayOll/getProductAlls", async () => {
    const res = await APIPayoll.getProductAll()
    console.log(res)
    // return res.data.todos
})

export const getTransaksiCounts = createAsyncThunk("PayOll/getTransaksiCounts", async () => {
    const res = await APIPayoll.getTransaksi()
    console.log(res)
    // return res.data.todos
})

export const getCurrentProfiles = createAsyncThunk("PayOll/getCurrentProfiles", async () => {
    const res = await APIPayoll.getCurrentProfile()
    console.log(res)
    // return res.data.todos
})



export const login = createAsyncThunk("PayOll/login", async () => {
    const res = await APIPayoll.login()
    console.log(res)
    // return res.data.todos
})

export const ItemSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(state)
                state.status = "success"
                // state.todos = action.payload
            })
        // .addCase(createTodos.fulfilled, (state, action) => {
        //     // console.log(typeof action.payload)
        //     state.status = "success"
        //     state.todos.push(action.payload)
        // })
        // .addCase(updateTodos.fulfilled, (state, action) => {
        //     // console.log(action)
        //     const index = state.todos.findIndex(post => post.id === action.payload.id);
        //     state.todos[index] = {
        //         ...state.todos[index],
        //         ...action.payload,
        //     };
        // })
        // .addCase(deleteTodos.fulfilled, (state, action) => {
        //     // console.log(action.payload)
        //     state.status = "success"
        //     state.todos = state.todos.filter(todo => {
        //         return todo.id !== action.payload.id
        //     })
        // })
    }
})

export const { hapusList, tambahList, handleCheck } = ItemSlice.actions;
export default ItemSlice.reducer 