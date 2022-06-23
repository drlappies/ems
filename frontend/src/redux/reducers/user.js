import { networkStatus } from "../../constants/network"
import userActionTypes from "../actions/user"

const initialState = {
    user: {},
    postLoginStatus: networkStatus.IDLE,
    getUserStatus: networkStatus.IDLE,
    getUserAttdStatus: networkStatus.IDLE,
    getUserLeaveStatus: networkStatus.IDLE,
    getUserOvertimeStatus: networkStatus.IDLE,
    getUserPayrollStatus: networkStatus.IDLE,
    getUserReimbmentStatus: networkStatus.IDLE,
    getUserAllowanceStatus: networkStatus.IDLE,
    getUserBonusStatus: networkStatus.IDLE,
    getUserCheckInStatus: networkStatus.IDLE,
    userAttd: [],
    userLeave: [],
    userOvertime: [],
    userPayroll: [],
    payrollCount: 0,
    userReimbment: [],
    reimbmentCount: 0,
    userAllowance: [],
    allowanceCount: 0,
    userBonus: [],
    bonusCount: 0,
    userDeduction: [],
    deductionCount: 0,
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case userActionTypes.POST_LOGIN:
            return {
                ...state,
                postLoginStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.POST_LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                postLoginStatus: networkStatus.FETCH_SUCCEEDED
            }

        case userActionTypes.POST_LOGIN_FAILURE:
            return {
                ...state,
                postLoginStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_SUCCEEDED,
                user: payload.user
            }

        case userActionTypes.GET_USER_FAILURE:
            return {
                ...state,
                getUserStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_ATTENDANCE:
            return {
                ...state,
                getUserAttdStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_ATTENDANCE_SUCCESS:
            return {
                ...state,
                getUserAttdStatus: networkStatus.FETCH_SUCCEEDED,
                userAttd: payload.userAttd
            }

        case userActionTypes.GET_USER_ATTENDANCE_FAILURE:
            return {
                ...state,
                getUserAttdStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER_LEAVE:
            return {
                ...state,
                getUserLeaveStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_LEAVE_SUCCESS:
            return {
                ...state,
                getUserLeaveStatus: networkStatus.FETCH_SUCCEEDED,
                userLeave: payload.userLeave
            }

        case userActionTypes.GET_USER_LEAVE_FAILURE:
            return {
                ...state,
                getUserLeaveStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_OVERTIME:
            return {
                ...state,
                getUserOvertimeStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_OVERTIME_SUCCESS:
            return {
                ...state,
                getUserOvertimeStatus: networkStatus.FETCH_SUCCEEDED,
                userOvertime: payload.userOvertime
            }

        case userActionTypes.GET_USER_OVERTIME_FAILURE:
            return {
                ...state,
                getUserOvertimeStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_PAYROLL:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_PAYROLL_SUCCESS:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_SUCCEEDED,
                userPayroll: payload.userPayroll,
                payrollCount: payload.payrollCount
            }

        case userActionTypes.GET_USER_PAYROLL_FAILURE:
            return {
                ...state,
                getUserPayrollStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_REIMBURSEMENT:
            return {
                ...state,
                getUserReimbmentStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_REIMBURSEMENT_SUCCESS:
            return {
                ...state,
                getUserReimbmentStatus: networkStatus.FETCH_SUCCEEDED,
                userReimbment: payload.userReimbment,
                reimbmentCount: payload.reimbmentCount
            }

        case userActionTypes.GET_USER_REIMBURSEMENT_FAILURE:
            return {
                ...state,
                getUserReimbmentStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER_ALLOWANCE:
            return {
                ...state,
                getUserAllowanceStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_ALLOWANCE_SUCCESS:
            return {
                ...state,
                getUserAllowanceStatus: networkStatus.FETCH_SUCCEEDED,
                userAllowance: payload.userAllowance,
                allowanceCount: payload.allowanceCount
            }

        case userActionTypes.GET_USER_ALLOWANCE_FAILURE:
            return {
                ...state,
                getUserAllowanceStatus: networkStatus.FETCH_FAILED,
            }

        case userActionTypes.GET_USER_BONUS:
            return {
                ...state,
                getUserBonusStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_BONUS_SUCCESS:
            return {
                ...state,
                getUserBonusStatus: networkStatus.FETCH_SUCCEEDED,
                userBonus: payload.userBonus,
                bonusCount: payload.bonusCount
            }

        case userActionTypes.GET_USER_BONUS_FAILURE:
            return {
                ...state,
                getUserBonusStatus: networkStatus.FETCH_FAILED
            }

        case userActionTypes.GET_USER_DEDUCTION:
            return {
                ...state,
                getUserDeductionStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case userActionTypes.GET_USER_DEDUCTION_SUCCESS:
            return {
                ...state,
                getUserDeductionStatus: networkStatus.FETCH_SUCCEEDED,
                userDeduction: payload.userDeduction,
                deductionCount: payload.deductionCount
            }

        case userActionTypes.GET_USER_DEDUCTION_FAILURE:
            return {
                ...state,
                getUserDeductionStatus: networkStatus.FETCH_FAILED
            }

        default:
            return { ...state }
    }
}

export default userReducer