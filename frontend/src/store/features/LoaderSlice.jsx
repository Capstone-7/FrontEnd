import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const LoaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoader(state, action) {
            state = action.payload;
            return state;
        },
    },
});

export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;