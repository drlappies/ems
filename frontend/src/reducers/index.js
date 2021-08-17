import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import attendanceReducer from "./attendance";
import employeeReducer from "./employee";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    attendance: attendanceReducer,
    employee: employeeReducer
})

export default reducer