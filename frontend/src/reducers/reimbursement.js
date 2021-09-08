import { ADD_ALL_TO_REIMBURSEMENT_SELECTED, ADD_TO_REIMBURSEMENT_SELECTED, BATCH_DELETE_REIMBURSEMENT, BATCH_UPDATE_REIMBURSEMENT, CREATE_REIMBURSEMENT, DELETE_REIMBURSEMENT, FETCH_REIMBURSEMENT, FETCH_REIMBURSEMENT_BY_QUERY, HANDLE_REIMBURSEMENT_CHANGE, REMOVE_ALL_FROM_REIMBURSEMENT_SELECTED, REMOVE_FROM_REIMBURSEMENT_SELECTED, RESET_REIMBURSEMENT_QUERY, TOGGLE_REIMBURSEMENT_BATCH_DELETING, TOGGLE_REIMBURSEMENT_BATCH_UPDATING, TOGGLE_REIMBURSEMENT_CREATING, TOGGLE_REIMBURSEMENT_DELETING, TOGGLE_REIMBURSEMENT_FILTERING, TOGGLE_REIMBURSEMENT_UPDATING, UPDATE_REIMBURSEMENT } from "../types/reimbursement"

const initialState = {
    record: [],
    employeeList: [],
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
    currentLimit: 10,
    queryText: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryDateFrom: "",
    queryDateTo: "",
    queryStatus: "",
    isCreating: false,
    createReimbursementEmployeeId: "",
    createReimbursementAmount: "",
    createReimbursementReason: "",
    createReimbursementDate: "",
    isUpdating: false,
    isDeleting: false,
    isFiltering: false,
    selectedRecord: [],
    isBatchUpdating: false,
    updateReimbursementAmount: "",
    updateReimbursementDate: "",
    updateReimbursementStatus: "",
    updateReimbursementReason: "",
    isBatchDeleting: false
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
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                employeeList: action.payload.employeeList
            }
        case TOGGLE_REIMBURSEMENT_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case HANDLE_REIMBURSEMENT_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case CREATE_REIMBURSEMENT:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case TOGGLE_REIMBURSEMENT_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                id: action.payload.id,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            }
        case UPDATE_REIMBURSEMENT:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: state.record.map(el => el.id === action.payload.id ? { ...el, status: action.payload.status, reason: action.payload.reason, date: action.payload.date, amount: action.payload.amount } : el)
            }
        case TOGGLE_REIMBURSEMENT_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                id: action.payload.id,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname
            }
        case DELETE_REIMBURSEMENT:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case TOGGLE_REIMBURSEMENT_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case FETCH_REIMBURSEMENT_BY_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case RESET_REIMBURSEMENT_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case ADD_TO_REIMBURSEMENT_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_REIMBURSEMENT_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_REIMBURSEMENT_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_FROM_REIMBURSEMENT_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_REIMBURSEMENT_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case BATCH_UPDATE_REIMBURSEMENT:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                record: state.record.map((el, i) => {
                    if (el.id === action.payload.update[i].id) {
                        return {
                            ...el,
                            amount: action.payload.update[i].amount,
                            date: action.payload.update[i].date,
                            reason: action.payload.update[i].reason,
                            status: action.payload.update[i].status
                        }
                    } else {
                        return el
                    }
                }),
                updateReimbursementAmount: action.payload.updateReimbursementAmount,
                updateReimbursementDate: action.payload.updateReimbursementDate,
                updateReimbursementStatus: action.payload.updateReimbursementStatus,
                updateReimbursementReason: action.payload.updateReimbursementReason,
                selectedRecord: action.payload.selectedRecord
            }
        case TOGGLE_REIMBURSEMENT_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
            }
        case BATCH_DELETE_REIMBURSEMENT:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                selectedRecord: action.payload.selectedRecord
            }
        default:
            return state
    }
}

export default reimbursementReducer