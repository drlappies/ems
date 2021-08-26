import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import attendanceReducer from "./attendance";
import employeeReducer from "./employee";
import overtimeReducer from "./overtime";
import configReducer from "./config";
import departmentReducer from "./department";
import positionReducer from "./position";
import allowanceReducer from "./allowance";
import reimbursementReducer from "./reimbursement";
import bonusReducer from "./bonus";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    attendance: attendanceReducer,
    employee: employeeReducer,
    overtime: overtimeReducer,
    config: configReducer,
    department: departmentReducer,
    position: positionReducer,
    allowance: allowanceReducer,
    reimbursement: reimbursementReducer,
    bonus: bonusReducer
})

export default reducer