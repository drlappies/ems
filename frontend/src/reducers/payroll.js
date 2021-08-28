import { FETCH_PAYROLL, UPDATE_PAYROLL, RESET_PAYROLL, FETCH_SPECIFIC_PAYROLL } from "../types/payroll"

const initialState = {
    record: [],
    employeeList: [],
    starting: "",
    ending: "",
    isOTcaled: false,
    isLeaveCaled: false,
    isDeductCaled: false,
    isBonusCaled: false,
    isAllowanceCaled: false,
    isReimbursementCaled: false,
    from: "",
    to: "",
    amount: "",
    reimbursement: "",
    allowance: "",
    deduction: "",
    bonus: "",
    overtime: "",
    status: "",
    firstname: "",
    lastname: "",
    payrollId: "",
    employeeId: "",
    selectedEmployee: [],
    unselectedEmployee: [],
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: 0,
    queryFrom: "",
    queryTo: "",
    queryText: ""
}

const payrollReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYROLL:
            return {
                ...state,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                unselectedEmployee: action.payload.unselectedEmployee,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case UPDATE_PAYROLL:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case RESET_PAYROLL:
            return {
                ...state,
                employeeId: "",
                starting: "",
                ending: "",
                isOTcaled: false,
                isLeaveCaled: false,
                isDeductCaled: false,
                isBonusCaled: false,
                isAllowanceCaled: false,
                isReimbursementCaled: false,
            }
        case FETCH_SPECIFIC_PAYROLL:
            return {
                ...state,
                from: action.payload.from,
                to: action.payload.to,
                amount: action.payload.amount,
                reimbursement: action.payload.reimbursement,
                allowance: action.payload.allowance,
                deduction: action.payload.deduction,
                bonus: action.payload.bonus,
                overtime: action.payload.overtime,
                status: action.payload.status,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                payrollId: action.payload.payrollId,
                employeeId: action.payload.employeeId
            }
        default:
            return state
    }
}

export default payrollReducer