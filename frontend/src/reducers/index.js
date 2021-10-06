import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import employeeReducer from "./employee";
import configReducer from "./config";
import departmentReducer from "./department";
import positionReducer from "./position";
import allowanceReducer from "./allowance";
import reimbursementReducer from "./reimbursement";
import bonusReducer from "./bonus";
import deductionReducer from "./deduction";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    employee: employeeReducer,
    config: configReducer,
    department: departmentReducer,
    position: positionReducer,
    allowance: allowanceReducer,
    reimbursement: reimbursementReducer,
    bonus: bonusReducer,
    deduction: deductionReducer,
})

export default reducer