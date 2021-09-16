import { FETCH_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE, ADD_TO_ATTENDANCE_SELECTED, REMOVE_FROM_ATTENDANCE_SELECTED, RESET_ATTENDANCE_SELECTED, ADD_ALL_TO_ATTENDANCE_SELECTED, UPDATE_ATTENDANCE_ROW, TOGGLE_ATTENDANCE_UPDATING, TOGGLE_ATTENDANCE_CREATING, TOGGLE_ATTENDANCE_DELETING, TOGGLE_ATTENDANCE_FILTERING, TOGGLE_ATTENDANCE_BATCH_DELETING, TOGGLE_ATTENDANCE_BATCH_UPDATING, BATCH_DELETE_ATTENDANCE, UPDATE_ATTENDANCE_RECORD, BATCH_UPDATE_ATTENDANCE, CREATE_ATTENDANCE, FETCH_ATTENDANCE_BY_FILTER, RESET_ATTENDANCE_QUERY } from '../types/attendance'

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
    queryEmployeeId: "",
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
    isAttendanceAllSelected: false,
    isUpdating: false,
    isCreating: false,
    isFiltering: false,
    isBatchDeleting: false,
    isBatchUpdating: false,
    isDeleting: false,
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
        case ADD_TO_ATTENDANCE_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_ATTENDANCE_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case RESET_ATTENDANCE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord,
                isAttendanceAllSelected: action.payload.isAttendanceAllSelected
            }
        case RESET_ATTENDANCE_QUERY:
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
                queryEmployeeId: action.payload.queryEmployeeId,
                record: action.payload.record,
                pageLength: action.payload.count,
                currentPage: action.payload.page,
                currentPageStart: action.payload.pageStart,
                currentPageEnd: action.payload.pageEnd,
                employeeList: action.payload.employeeList,
                currentLimit: action.payload.currentLimit,
            }
        case UPDATE_ATTENDANCE_ROW:
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
        case ADD_ALL_TO_ATTENDANCE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.selectedRecord,
                isAttendanceAllSelected: action.payload.isAttendanceAllSelected
            }
        case TOGGLE_ATTENDANCE_UPDATING:
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
        case TOGGLE_ATTENDANCE_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case TOGGLE_ATTENDANCE_DELETING:
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
        case TOGGLE_ATTENDANCE_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case TOGGLE_ATTENDANCE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case TOGGLE_ATTENDANCE_BATCH_UPDATING:
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
                selectedRecord: action.payload.selectedRecord,
                isAllSelected: action.payload.isAllSelected
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