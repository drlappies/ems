import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import attendanceReducer from "./attendance";
import employeeReducer from "./employee";
import overtimeReducer from "./overtime";
import configReducer from "./config";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    attendance: attendanceReducer,
    employee: employeeReducer,
    overtime: overtimeReducer,
    config: configReducer
})

export default reducer