import { DELETE_OVERTIME, UPDATE_OVERTIME_RECORD, CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT, FETCH_OVERTIME_RECORD, UPDATE_OVERTIME, ADD_TO_SELECTED, REMOVE_FROM_SELECTED, RESET_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_DELETING, TOGGLE_BATCH_UPDATING, TOGGLE_BATCH_DELETING, TOGGLE_FILTERING, RESET_OVERTIME_QUERY, ADD_ALL_TO_SELECTED, FETCH_OVERTIME_BY_FILTER, BATCH_UPDATE_OVERTIME, CREATE_OVERTIME, BATCH_DELETE_OVERTIME } from "../types/overtime";

const initialState = {
    overtimeCheckIn: null,
    overtimeCheckOut: null,
    overtimeRecord: [],
    selectedRecord: [],
    employeeList: [],
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 10,
    pageLength: 0,
    overtimeId: "",
    overtimeEmployeeId: "",
    overtimeEmployeeFirstname: "",
    overtimeEmployeeLastname: "",
    overtimeFrom: "",
    overtimeTo: "",
    overtimeDate: "",
    overtimeStatus: "",
    createStarting: "",
    createEnding: "",
    createDate: "",
    createEmployeeId: "",
    createIsApproved: false,
    queryText: "",
    queryStatus: "",
    queryDateFrom: "",
    queryDateTo: "",
    queryCheckinFrom: "",
    queryCheckinTo: "",
    queryCheckoutFrom: "",
    queryCheckoutTo: "",
    queryEmployeeId: "",
    updateOvertimeTimein: "",
    updateOvertimeTimeout: "",
    updateOvertimeStatus: "",
    batchUpdateOvertimeTimein: "",
    batchUpdateOvertimeTimeout: "",
    batchUpdateOvertimeStatus: "",
    isUpdating: false,
    isCreating: false,
    isDeleting: false,
    isFiltering: false,
    isBatchUpdating: false,
    isBatchDeleting: false,
    isAllSelected: false
}

const overtimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OVERTIME_STATUS:
            return {
                ...state,
                overtimeCheckIn: action.payload.overtimeCheckIn,
                overtimeCheckOut: action.payload.overtimeCheckOut
            }
        case CREATE_OVERTIME_TIMEIN:
            return {
                ...state,
                overtimeCheckIn: action.payload.overtimeCheckIn
            }
        case CREATE_OVERTIME_TIMEOUT:
            return {
                ...state,
                overtimeCheckOut: action.payload.overtimeCheckOut
            }
        case FETCH_OVERTIME_RECORD:
            return {
                ...state,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_OVERTIME:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case ADD_TO_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case RESET_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord,
                isAllSelected: action.payload.isAllSelected
            }
        case TOGGLE_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                overtimeId: action.payload.overtimeId,
                overtimeEmployeeId: action.payload.overtimeEmployeeId,
                overtimeEmployeeFirstname: action.payload.overtimeEmployeeFirstname,
                overtimeEmployeeLastname: action.payload.overtimeEmployeeLastname,
                overtimeFrom: action.payload.overtimeFrom,
                overtimeTo: action.payload.overtimeTo,
                overtimeDate: action.payload.overtimeDate,
                overtimeStatus: action.payload.overtimeStatus
            }
        case TOGGLE_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case TOGGLE_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                overtimeId: action.payload.overtimeId,
                overtimeEmployeeId: action.payload.overtimeEmployeeId,
                overtimeEmployeeFirstname: action.payload.overtimeEmployeeFirstname,
                overtimeEmployeeLastname: action.payload.overtimeEmployeeLastname,
                overtimeFrom: action.payload.overtimeFrom,
                overtimeTo: action.payload.overtimeTo,
                overtimeDate: action.payload.overtimeDate,
                overtimeStatus: action.payload.overtimeStatus
            }
        case TOGGLE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }
        case TOGGLE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case TOGGLE_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case RESET_OVERTIME_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case ADD_ALL_TO_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord,
                isAllSelected: action.payload.isAllSelected
            }
        case FETCH_OVERTIME_BY_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_OVERTIME_RECORD:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case BATCH_UPDATE_OVERTIME:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case CREATE_OVERTIME:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case DELETE_OVERTIME:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case BATCH_DELETE_OVERTIME:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                overtimeRecord: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
                selectedRecord: action.payload.selectedRecord,
                isAllSelected: action.payload.isAllSelected
            }
        default:
            return state
    }
}

export default overtimeReducer