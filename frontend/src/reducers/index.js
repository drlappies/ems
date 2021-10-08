import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
})

export default reducer