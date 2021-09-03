import { FETCH_ATTENDANCE, UPDATE_ATTENDANCE, FETCH_SPECIFIC_ATTENDANCE, RESET_ATTENDANCE, ADD_SELECTED, REMOVE_SELECTED, RESET_SELECTED, RESET_QUERY, UPDATE_ROW, ADD_ALL_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_FILTERING, TOGGLE_BATCH_DELETING, TOGGLE_DELETING, TOGGLE_BATCH_UPDATING } from '../types/attendance'

const initialState = {
    record: [],
    selectedRecord: [],
    pageLength: 0,
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 10,
    employeeList: [],
    queryText: "",
    queryStatus: "",
    queryDateFrom: "",
    queryDateTo: "",
    queryCheckinFrom: "",
    queryCheckinTo: "",
    queryCheckoutFrom: "",
    queryCheckoutTo: "",
    attendanceId: "",
    employeeId: "",
    employeeFirstname: "",
    employeeLastname: "",
    attendanceCheckin: "",
    attendanceCheckout: "",
    attendanceStatus: "",
    attendanceDate: "",
    updateAttendanceCheckin: "",
    updateAttendanceCheckout: "",
    updateAttendanceStatus: "",
    isAllSelected: false,
    isUpdating: false,
    isCreating: false,
    isFiltering: false,
    isBatchDeleting: false,
    isBatchUpdating: false,
    isDeleting: false
}

const attendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ATTENDANCE:
            return {
                ...state,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList
            }
        case UPDATE_ATTENDANCE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FETCH_SPECIFIC_ATTENDANCE:
            return {
                ...state,
                attendanceId: action.payload.attendanceId,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                attendanceCheckin: action.payload.attendanceCheckin,
                attendanceCheckout: action.payload.attendanceCheckout,
                attendanceStatus: action.payload.attendanceStatus,
                attendanceDate: action.payload.attendanceDate
            }
        case RESET_ATTENDANCE:
            return {
                ...state,
                attendanceId: "",
                employeeId: "",
                employeeFirstname: "",
                employeeLastname: "",
                attendanceCheckin: "",
                attendanceCheckout: "",
                attendanceStatus: "",
                attendanceDate: "",
                updateAttendanceCheckin: "",
                updateAttendanceCheckout: "",
                updateAttendanceStatus: ""
            }
        case ADD_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case RESET_SELECTED:
            return {
                ...state,
                selectedRecord: []
            }
        case RESET_QUERY:
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
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit
            }
        case UPDATE_ROW:
            return {
                ...state,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case ADD_ALL_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord
            }
        case TOGGLE_UPDATING:
            return {
                ...state,
                isUpdating: !state.isUpdating,
                attendanceId: action.payload.attendanceId,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                attendanceCheckin: action.payload.attendanceCheckin,
                attendanceCheckout: action.payload.attendanceCheckout,
                attendanceStatus: action.payload.attendanceStatus,
                attendanceDate: action.payload.attendanceDate
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
                attendanceId: action.payload.attendanceId,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                attendanceCheckin: action.payload.attendanceCheckin,
                attendanceCheckout: action.payload.attendanceCheckout,
                attendanceStatus: action.payload.attendanceStatus,
                attendanceDate: action.payload.attendanceDate
            }
        case TOGGLE_FILTERING:
            return {
                ...state,
                isFiltering: !state.isFiltering
            }
        case TOGGLE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: !state.isBatchDeleting
            }
        case TOGGLE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: !state.isBatchUpdating,
                updateAttendanceCheckin: "",
                updateAttendanceCheckout: "",
                updateAttendanceStatus: "",
            }
        default:
            return state
    }
}

export default attendanceReducer