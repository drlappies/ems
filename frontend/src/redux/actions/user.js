const userActionTypes = {
    POST_LOGIN: "POST_LOGIN",
    POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
    POST_LOGIN_FAILURE: "POST_LOGIN_FAILURE",

    LOGOUT: "LOGOUT",

    GET_USER: "GET_USER",
    GET_USER_SUCCESS: "GET_USER_SUCCESS",
    GET_USER_FAILURE: "GET_USER_FAILURE",

    GET_USER_ATTENDANCE: "GET_USER_ATTENDANCE",
    GET_USER_ATTENDANCE_SUCCESS: "GET_USER_ATTENDANCE_SUCCESS",
    GET_USER_ATTENDANCE_FAILURE: "GET_USER_ATTENDANCE_FAILURE",

    GET_USER_LEAVE: "GET_USER_LEAVE",
    GET_USER_LEAVE_SUCCESS: "GET_USER_LEAVE_SUCCESS",
    GET_USER_LEAVE_FAILURE: "GET_USER_LEAVE_FAILURE",

    GET_USER_OVERTIME: "GET_USER_OVERTIME",
    GET_USER_OVERTIME_SUCCESS: "GET_USER_OVERTIME_SUCCESS",
    GET_USER_OVERTIME_FAILURE: "GET_USER_OVERTIME_FAILURE",

    GET_USER_PAYROLL: "GET_USER_PAYROLL",
    GET_USER_PAYROLL_SUCCESS: "GET_USER_PAYROLL_SUCCESS",
    GET_USER_PAYROLL_FAILURE: "GET_USER_PAYROLL_FAILURE",

    GET_USER_REIMBURSEMENT: "GET_USER_REIMBURSEMENT",
    GET_USER_REIMBURSEMENT_SUCCESS: "GET_USER_REIMBURSEMENT_SUCCESS",
    GET_USER_REIMBURSEMENT_FAILURE: "GET_USER_REIMBURSEMENT_FAILURE",

    GET_USER_ALLOWANCE: "GET_USER_ALLOWANCE",
    GET_USER_ALLOWANCE_SUCCESS: "GET_USER_ALLOWANCE_SUCCESS",
    GET_USER_ALLOWANCE_FAILURE: "GET_USER_ALLOWANCE_FAILURE",

    GET_USER_BONUS: "GET_USER_BONUS",
    GET_USER_BONUS_SUCCESS: "GET_USER_BONUS_SUCCESS",
    GET_USER_BONUS_FAILURE: "GET_USER_BONUS_FAILURE",

    GET_USER_DEDUCTION: "GET_USER_DEDUCTION",
    GET_USER_DEDUCTION_SUCCESS: "GET_USER_DEDUCTION_SUCCESS",
    GET_USER_DEDUCTION_FAILURE: "GET_USER_DEDUCTION_FAILURE",

    GET_USER_CHECK_IN_STATUS: "GET_USER_CHECK_IN_STATUS",
    GET_USER_CHECK_IN_STATUS_SUCCESS: "GET_USER_CHECK_IN_STATUS_SUCCESS",
    GET_USER_CHECK_IN_STATUS_FAILURE: "GET_USER_CHECK_IN_STATUS_FAILURE",

    GET_USER_OVERTIME_CHECK_IN_STATUS: "GET_USER_OVERTIME_CHECK_IN_STATUS",
    GET_USER_OVERTIME_CHECK_IN_STATUS_SUCCESS: "GET_USER_OVERTIME_CHECK_IN_STATUS_SUCCESS",
    GET_USER_OVERTIME_CHECK_IN_STATUS_FAILURE: "GET_USER_OVERTIME_CHECK_IN_STATUS_FAILURE"
}

export default userActionTypes

export function postLogin(payload) {
    return {
        type: userActionTypes.POST_LOGIN,
        payload
    }
}

export function postLoginSuccess(payload) {
    return {
        type: userActionTypes.POST_LOGIN_SUCCESS,
        payload
    }
}

export function postLoginFailure(payload) {
    return {
        type: userActionTypes.POST_LOGIN_FAILURE,
        payload
    }
}

export function logout(payload) {
    return {
        type: userActionTypes.LOGOUT,
        payload
    }
}

export function getUserAttendance(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE,
        payload
    }
}

export function getUserAttendanceSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE_SUCCESS,
        payload
    }
}

export function getUserAttendanceFailure(payload) {
    return {
        type: userActionTypes.GET_USER_ATTENDANCE_FAILURE,
        payload
    }
}

export function getUserLeave(payload) {
    return {
        type: userActionTypes.GET_USER_LEAVE,
        payload
    }
}

export function getUserLeaveSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_LEAVE_SUCCESS,
        payload,
    }
}

export function getUserLeaveFailure(payload) {
    return {
        type: userActionTypes.GET_USER_OVERTIME_FAILURE,
        payload,
    }
}

export function getUserOvertime(payload) {
    return {
        type: userActionTypes.GET_USER_OVERTIME,
        payload,
    }
}

export function getUserOvertimeSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_OVERTIME_SUCCESS,
        payload,
    }
}

export function getUserOvertimeFailure(payload) {
    return {
        type: userActionTypes.GET_USER_OVERTIME_FAILURE,
        payload,
    }
}

export function getUserPayroll(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL,
        payload
    }
}

export function getUserPayrollSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL_SUCCESS,
        payload
    }
}

export function getUserPayrollFailure(payload) {
    return {
        type: userActionTypes.GET_USER_PAYROLL_FAILURE,
        payload
    }
}

export function getUserReimbursement(payload) {
    return {
        type: userActionTypes.GET_USER_REIMBURSEMENT,
        payload
    }
}

export function getUserReimbursementSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_REIMBURSEMENT_SUCCESS,
        payload
    }
}

export function getUserReimbursementFailure(payload) {
    return {
        type: userActionTypes.GET_USER_REIMBURSEMENT_FAILURE,
        payload
    }
}

export function getUserAllowance(payload) {
    return {
        type: userActionTypes.GET_USER_ALLOWANCE,
        payload
    }
}

export function getUserAllowanceSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_ALLOWANCE_SUCCESS,
        payload
    }
}

export function getUserAllowanceFailure(payload) {
    return {
        type: userActionTypes.GET_USER_ALLOWANCE_FAILURE,
        payload
    }
}

export function getUserBonus(payload) {
    return {
        type: userActionTypes.GET_USER_BONUS,
        payload
    }
}

export function getUserBonusSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_BONUS_SUCCESS,
        payload
    }
}

export function getUserBonusFailure(payload) {
    return {
        type: userActionTypes.GET_USER_BONUS_FAILURE,
        payload
    }
}

export function getUserDeduction(payload) {
    return {
        type: userActionTypes.GET_USER_DEDUCTION,
        payload
    }
}

export function getUserDeductionSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_DEDUCTION_SUCCESS,
        payload,
    }
}

export function getUserDeductionFailure(payload) {
    return {
        type: userActionTypes.GET_USER_DEDUCTION_FAILURE,
        payload
    }
}

export function getUser(payload) {
    return {
        type: userActionTypes.GET_USER,
        payload
    }
}

export function getUserSuccess(payload) {
    return {
        type: userActionTypes.GET_USER_SUCCESS,
        payload
    }
}

export function getUserFailure(payload) {
    return {
        type: userActionTypes.GET_USER_FAILURE,
        payload
    }
}
