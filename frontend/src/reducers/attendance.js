import { FETCH_ATTENDANCE, UPDATE_ATTENDANCE, FETCH_SPECIFIC_ATTENDANCE, RESET_ATTENDANCE, ADD_SELECTED, REMOVE_SELECTED, RESET_SELECTED, RESET_QUERY, UPDATE_ROW, ADD_ALL_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_FILTERING, TOGGLE_BATCH_DELETING, TOGGLE_DELETING, TOGGLE_BATCH_UPDATING, DELETE_ATTENDANCE, BATCH_DELETE_ATTENDANCE, UPDATE_ATTENDANCE_RECORD, BATCH_UPDATE_ATTENDANCE, CREATE_ATTENDANCE, FETCH_ATTENDANCE_BY_FILTER } from '../types/attendance'

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
                selectedRecord: action.payload.selectedRecord
            }
        case RESET_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                queryText: action.payload.queryText,
                queryStatus: action.payload.queryStatus,
                queryDateFrom: action.payload.queryDateFrom,
                queryDateTo: action.payload.queryDateTo,
                queryCheckinFrom: action.payload.queryCheckinFrom,
                queryCheckinTo: action.payload.queryCheckinTo,
                queryCheckoutFrom: action.payload.queryCheckoutFrom,
                queryCheckoutTo: action.payload.queryCheckoutTo,
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
                isCreating: action.payload.isCreating
            }
        case TOGGLE_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
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
                isFiltering: action.payload.isFiltering
            }
        case TOGGLE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case TOGGLE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                updateAttendanceCheckin: action.payload.updateAttendanceCheckin,
                updateAttendanceCheckout: action.payload.updateAttendanceCheckout,
                updateAttendanceStatus: action.payload.updateAttendanceStatus,
            }
        case DELETE_ATTENDANCE:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case BATCH_DELETE_ATTENDANCE:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
                selectedRecord: action.payload.selectedRecord
            }
        case UPDATE_ATTENDANCE_RECORD:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case BATCH_UPDATE_ATTENDANCE:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case CREATE_ATTENDANCE:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case FETCH_ATTENDANCE_BY_FILTER:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        default:
            return state
    }
}

export default attendanceReducer