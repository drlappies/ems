import { FETCH_BONUS, UPDATE_BONUS, CREATE_BONUS, FETCH_BONUS_BY_ENTRIES, TOGGLE_BONUS_CREATING, TOGGLE_BONUS_FILTERING, FETCH_BONUS_BY_FILTER, RESET_BONUS_FILTER, TOGGLE_BONUS_UPDATING, CONFIRM_BONUS_UPDATE, ADD_TO_BONUS_SELECTED, REMOVE_FROM_BONUS_SELECTED, ADD_ALL_TO_BONUS_SELECTED, REMOVE_ALL_FROM_BONUS_SELECTED, TOGGLE_BONUS_BATCH_UPDATING, BATCH_UPDATE_BONUS, TOGGLE_BONUS_BATCH_DELETING, BATCH_DELETE_BONUS, TOGGLE_BONUS_DELETING, DELETE_BONUS } from "../types/bonus"

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
    currentLimit: 10,
    pageLength: 0,
    queryDateFrom: "",
    queryDateTo: "",
    queryAmountFrom: "",
    queryAmountTo: "",
    queryText: "",
    queryEmployeeId: "",
    isUpdating: false,
    isCreating: false,
    createEmployeeId: "",
    createBonusReason: "",
    createBonusAmount: "",
    createBonusDate: "",
    isFiltering: false,
    selectedRecord: [],
    updateEmployeeId: "",
    updateDate: "",
    updateReason: "",
    updateAmount: "",
    isBatchUpdating: false,
    isBatchDeleting: false,
    isDeleting: false
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
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_BONUS:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FETCH_BONUS_BY_ENTRIES:
            return {
                ...state,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_BONUS_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case CREATE_BONUS:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_BONUS_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case FETCH_BONUS_BY_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case RESET_BONUS_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case TOGGLE_BONUS_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                bonusId: action.payload.bonusId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case CONFIRM_BONUS_UPDATE:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case ADD_TO_BONUS_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_BONUS_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_BONUS_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_FROM_BONUS_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_BONUS_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case BATCH_UPDATE_BONUS:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                updateEmployeeId: action.payload.updateEmployeeId,
                updateBonusReason: action.payload.updateBonusReason,
                updateBonusAmount: action.payload.updateBonusAmount,
                updateBonusDate: action.payload.updateBonusDate,
                selectedRecord: action.payload.selectedRecord
            }
        case TOGGLE_BONUS_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case BATCH_DELETE_BONUS:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                selectedRecord: action.payload.selectedRecord
            }
        case TOGGLE_BONUS_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                bonusId: action.payload.bonusId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case DELETE_BONUS:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                bonusId: action.payload.bonusId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        default:
            return state
    }
}

export default bonusReducer