import { combineReducers } from "redux";
import authReducer from "./auth";
import uiReducer from './ui';
import punchReducer from "./punch";
import employeeReducer from "./employee";
import overtimeReducer from "./overtime";
import configReducer from "./config";
import departmentReducer from "./department";
import positionReducer from "./position";
import allowanceReducer from "./allowance";
import reimbursementReducer from "./reimbursement";
import bonusReducer from "./bonus";
import deductionReducer from "./deduction";
import payrollReducer from "./payroll";
import leaveReducer from "./leave";

const reducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    punch: punchReducer,
    employee: employeeReducer,
    overtime: overtimeReducer,
    config: configReducer,
    department: departmentReducer,
    position: positionReducer,
    allowance: allowanceReducer,
    reimbursement: reimbursementReducer,
    bonus: bonusReducer,
    deduction: deductionReducer,
    payroll: payrollReducer,
    leave: leaveReducer
})

export default reducer