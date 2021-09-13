import { BATCH_UPDATE_DEDUCTION, CONFIRM_UPDATE_DEDUCTION, CREATE_DEDUCTION, DELETE_DEDUCTION, FETCH_DEDUCTION, FETCH_DEDUCTION_BY_ENTRIES, FETCH_DEDUCTION_BY_FILTER, RESET_DEDUCTION_FILTER, SELECT_ALL_DEDUCTION, SELECT_DEDUCTION, TOGGLE_DEDUCTION_BATCH_DELETING, TOGGLE_DEDUCTION_BATCH_UPDATING, TOGGLE_DEDUCTION_CREATING, TOGGLE_DEDUCTION_DELETING, TOGGLE_DEDUCTION_FILTERING, TOGGLE_DEDUCTION_UPDATING, UNSELECT_ALL_DEDUCTION, UNSELECT_DEDUCTION, UPDATE_DEDUCTION } from '../types/deduction'

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
    queryEmployeeId: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: "",
    currentLimit: 10,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    createEmployeeId: "",
    createReason: "",
    createAmount: "",
    createDate: "",
    isFiltering: false,
    selectedRecord: [],
    isBatchUpdating: false,
    isBatchDeleting: false,
    updateEmployeeId: "",
    updateDate: "",
    updateReason: "",
    updateAmount: ""
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
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_DEDUCTION: {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        case FETCH_DEDUCTION_BY_ENTRIES:
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
        case TOGGLE_DEDUCTION_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                deductionId: action.payload.deductionId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case CONFIRM_UPDATE_DEDUCTION:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                deductionId: action.payload.deductionId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case TOGGLE_DEDUCTION_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                deductionId: action.payload.deductionId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case DELETE_DEDUCTION:
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
                deductionId: action.payload.deductionId,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                amount: action.payload.amount,
                date: action.payload.date,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
            }
        case TOGGLE_DEDUCTION_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case CREATE_DEDUCTION:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                createEmployeeId: action.payload.createEmployeeId,
                createReason: action.payload.createReason,
                createAmount: action.payload.createAmount,
                createDate: action.payload.createDate
            }
        case TOGGLE_DEDUCTION_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case FETCH_DEDUCTION_BY_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case RESET_DEDUCTION_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case SELECT_DEDUCTION:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case UNSELECT_DEDUCTION:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case SELECT_ALL_DEDUCTION:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case UNSELECT_ALL_DEDUCTION:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_DEDUCTION_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case TOGGLE_DEDUCTION_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case BATCH_UPDATE_DEDUCTION:
            return {
                ...state,
                isBatchUpdating: false,
                record: action.payload.record,
                employeeRecord: action.payload.employeeRecord,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                updateEmployeeId: action.payload.updateEmployeeId,
                updateDate: action.payload.updateDate,
                updateReason: action.payload.updateReason,
                updateAmount: action.payload.updateAmount
            }
        default:
            return state
    }
}

export default deductionReducer