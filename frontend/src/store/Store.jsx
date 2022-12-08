import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducers from "./features/RootReducers";

const store = configureStore({
    reducer: rootReducers,
    middleware: [thunk]
})

export { store }