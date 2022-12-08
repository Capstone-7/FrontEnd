import { combineReducers } from "redux"
import UserSlice from "./UserSlice"
import TransactionSlice from "./TransactionSlice";

const rootReducers = combineReducers({
    UserSlice,
    TransactionSlice,
});

export default rootReducers;