import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT, FETCH_OVERTIME_RECORD, FETCH_SPECIFIC_OVERTIME_RECORD, RESET_OVERTIME_RECORD, UPDATE_OVERTIME, ADD_TO_SELECTED, REMOVE_FROM_SELECTED, RESET_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_DELETING, TOGGLE_BATCH_UPDATING, TOGGLE_BATCH_DELETING, TOGGLE_FILTERING, RESET_OVERTIME_QUERY, ADD_ALL_TO_SELECTED } from "../types/overtime";

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
        case FETCH_SPECIFIC_OVERTIME_RECORD:
            return {
                ...state,
                overtimeId: action.payload.overtimeId,
                overtimeEmployeeId: action.payload.overtimeEmployeeId,
                overtimeEmployeeFirstname: action.payload.overtimeEmployeeFirstname,
                overtimeEmployeeLastname: action.payload.overtimeEmployeeLastname,
                overtimeFrom: action.payload.overtimeFrom,
                overtimeTo: action.payload.overtimeTo,
                overtimeDate: action.payload.overtimeDate,
                overtimeStatus: action.payload.overtimeStatus
            }
        case RESET_OVERTIME_RECORD:
            return {
                ...state,
                overtimeId: "",
                overtimeEmployeeId: "",
                overtimeEmployeeFirstname: "",
                overtimeEmployeeLastname: "",
                overtimeFrom: "",
                overtimeTo: "",
                overtimeDate: "",
                overtimeStatus: "",
                updateOvertimeTimein: "",
                updateOvertimeTimeout: "",
                updateOvertimeStatus: ""
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
                selectedRecord: []
            }
        case TOGGLE_UPDATING:
            return {
                ...state,
                isUpdating: !state.isUpdating,
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
                isCreating: !state.isCreating
            }
        case TOGGLE_DELETING:
            return {
                ...state,
                isDeleting: !state.isDeleting,
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
                isBatchUpdating: !state.isBatchUpdating
            }
        case TOGGLE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: !state.isBatchDeleting
            }
        case TOGGLE_FILTERING:
            return {
                ...state,
                isFiltering: !state.isFiltering
            }
        case RESET_OVERTIME_QUERY:
            return {
                ...state,
                queryText: "",
                queryStatus: "",
                queryDateFrom: "",
                queryDateTo: "",
                queryCheckinFrom: "",
                queryCheckinTo: "",
                queryCheckoutFrom: "",
                queryCheckoutTo: "",
            }
        case ADD_ALL_TO_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord
            }
        default:
            return state
    }
}

export default overtimeReducer