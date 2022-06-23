import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import allowanceReducer from "./allowance";
import attendanceReducer from "./attendance";
import bonusReducer from "./bonus";
import deductionReducer from "./deduction";
import departmentReducer from "./department";
import employeeReducer from "./employee";
import leaveReducer from "./leave";
import overtimeReducer from "./overtime";
import payrollReducer from "./payroll";
import positionReducer from "./position";
import reimbursementReducer from "./reimbursement";
import userReducer from "./user"
import notificationReducer from "./notification";

const createRootReducer = (history) => {
    return combineReducers({
        router: connectRouter(history),
        user: userReducer,
        allownce: allowanceReducer,
        attendance: attendanceReducer,
        bonus: bonusReducer,
        deduction: deductionReducer,
        department: departmentReducer,
        employee: employeeReducer,
        leave: leaveReducer,
        overtime: overtimeReducer,
        payroll: payrollReducer,
        position: positionReducer,
        reimbursement: reimbursementReducer,
        notification: notificationReducer,
    })
}

export default createRootReducer