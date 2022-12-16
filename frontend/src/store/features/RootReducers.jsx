import { combineReducers } from "redux"
import UserSlice from "./UserSlice"
import TransactionSlice from "./TransactionSlice";
import LoaderSlice from "./LoaderSlice";

const rootReducers = combineReducers({
    UserSlice,
    LoaderSlice,
    TransactionSlice,
});

export default rootReducers;