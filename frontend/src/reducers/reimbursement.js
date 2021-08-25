import { FETCH_REIMBURSEMENT, FETCH_SPECIFIC_REIMBURSEMENT, RESET_REIMBURSEMENT } from "../types/reimbursement"

const initialState = {
    record: [],
    id: "",
    employeeId: "",
    amount: "",
    reason: "",
    date: "",
    status: "",
    firstname: "",
    lastname: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: 0,
}

const reimbursementReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REIMBURSEMENT:
            return {
                ...state,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case FETCH_SPECIFIC_REIMBURSEMENT:
            return {
                ...state,
                id: action.payload.id,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            }
        case RESET_REIMBURSEMENT:
            return {
                ...state,
                id: "",
                employeeId: "",
                amount: "",
                reason: "",
                date: "",
                status: "",
                firstname: "",
                lastname: ""
            }
        default:
            return state
    }
}

export default reimbursementReducer