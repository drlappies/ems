import { FETCH_DEDUCTION, FETCH_SPECIFIC_DEDUCTION, RESET_DEDUCTION, UPDATE_DEDUCTION } from '../types/deduction'

const initialState = {
    record: [],
    employeeRecord: [],
    deductionId: "",
    employeeId: "",
    reason: "",
    amount: "",
    date: "",
    firstname: "",
    lastname: "",
    queryDateFrom: "",
    queryDateTo: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryText: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: ""
}

const deductionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEDUCTION:
            return {
                ...state,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case FETCH_SPECIFIC_DEDUCTION:
            return {
                ...state,
                deductionId: action.payload.deductionId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: `${new Date(action.payload.date).getFullYear()}-${new Date(action.payload.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.date).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case RESET_DEDUCTION:
            return {
                ...state,
                deductionId: "",
                employeeId: "",
                reason: "",
                amount: "",
                date: "",
                firstname: "",
                lastname: ""
            }
        case UPDATE_DEDUCTION: {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        default:
            return state
    }
}

export default deductionReducer