import { FETCH_PAYROLL, UPDATE_PAYROLL, RESET_PAYROLL, TOGGLE_PAYROLL_CREATING, TOGGLE_PAYROLL_VIEWING, TOGGLE_PAYROLL_DELETING, TOGGLE_PAYROLL_BATCH_UPDATING, ADD_TO_PAYROLL_SELECTED, REMOVE_FROM_PAYROLL_SELECTED, RESET_PAYROLL_SELECTED, TOGGLE_PAYROLL_BATCH_DELETING, TOGGLE_PAYROLL_FILTERTING, RESET_PAYROLL_QUERY, TOGGLE_PAYROLL_UPDATING, ADD_ALL_TO_PAYROLL_SELECTED } from "../types/payroll"

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
    queryText: "",
    queryStatus: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryEmployeeId: "",
    queryIsReimbursementCaled: false,
    queryIsAllowanceCaled: false,
    queryIsDeductionCaled: false,
    queryIsBonusCaled: false,
    queryIsOvertimeCaled: false,
    queryIsLeaveCaled: false,
    selectedRecord: [],
    isCreating: false,
    isDeleting: false,
    isViewing: false,
    isFiltering: false,
    isUpdating: false,
    isBatchDeleting: false,
    isBatchUpdating: false,
    updateBatchPayrollStatus: "pending",
    currentLimit: 10
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
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
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
        case TOGGLE_PAYROLL_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                employeeId: action.payload.employeeId,
                starting: action.payload.starting,
                ending: action.payload.ending,
                isOTcaled: action.payload.isOTcaled,
                isLeaveCaled: action.payload.isLeaveCaled,
                isDeductCaled: action.payload.isDeductCaled,
                isBonusCaled: action.payload.isBonusCaled,
                isAllowanceCaled: action.payload.isAllowanceCaled,
                isReimbursementCaled: action.payload.isReimbursementCaled
            }
        case TOGGLE_PAYROLL_VIEWING:
            return {
                ...state,
                isViewing: action.payload.isViewing,
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
        case TOGGLE_PAYROLL_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
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
        case TOGGLE_PAYROLL_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case TOGGLE_PAYROLL_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case TOGGLE_PAYROLL_FILTERTING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case ADD_TO_PAYROLL_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_PAYROLL_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case RESET_PAYROLL_SELECTED:
            return {
                ...state,
                selectedRecord: []
            }
        case ADD_ALL_TO_PAYROLL_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord
            }
        case RESET_PAYROLL_QUERY:
            return {
                ...state,
                queryFrom: "",
                queryTo: "",
                queryText: "",
                queryStatus: "",
                queryAmountFrom: "",
                queryAmountTo: "",
                queryIsReimbursementCaled: false,
                queryIsAllowanceCaled: false,
                queryIsDeductionCaled: false,
                queryIsBonusCaled: false,
                queryIsOvertimeCaled: false,
                queryIsLeaveCaled: false,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                unselectedEmployee: action.payload.unselectedEmployee,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_PAYROLL_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
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
                employeeId: action.payload.employeeId,
                isReimbursementCaled: action.payload.isReimbursementCaled,
                isAllowanceCaled: action.payload.isAllowanceCaled,
                isDeductCaled: action.payload.isDeductCaled,
                isBonusCaled: action.payload.isBonusCaled,
                isOTcaled: action.payload.isOTcaled,
                isLeaveCaled: action.payload.isLeaveCaled
            }
        default:
            return state
    }
}

export default payrollReducer