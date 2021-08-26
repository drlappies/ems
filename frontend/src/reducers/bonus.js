import { FETCH_BONUS, FETCH_SPECIFIC_BONUS, UPDATE_BONUS, RESET_BONUS } from "../types/bonus"

const initialState = {
    record: [],
    employeeRecord: [],
    bonusId: "",
    employeeId: "",
    reason: "",
    amount: "",
    date: "",
    firstname: "",
    lastname: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: 0,
    queryDateFrom: "",
    queryDateTo: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryText: ""
}

const bonusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BONUS:
            return {
                ...state,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength
            }
        case FETCH_SPECIFIC_BONUS:
            return {
                ...state,
                bonusId: action.payload.bonusId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: `${new Date(action.payload.date).getFullYear()}-${new Date(action.payload.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.date).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case UPDATE_BONUS:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case RESET_BONUS:
            return {
                ...state,
                bonusId: "",
                employeeId: "",
                reason: "",
                amount: "",
                date: "",
                firstname: "",
                lastname: "",
            }
        default:
            return state
    }
}

export default bonusReducer