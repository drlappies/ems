import { DELETE_LEAVE, APPLY_LEAVE, FETCH_EMPLOYEE_AL, UPDATE_LEAVE, FETCH_LEAVE, FETCH_SPECIFIC_LEAVE, TOGGLE_LEAVE_CREATING, TOGGLE_LEAVE_VIEWING, TOGGLE_LEAVE_UPDATING, TOGGLE_LEAVE_DELETING, TOGGLE_LEAVE_BATCH_UPDATING, TOGGLE_LEAVE_BATCH_DELETING, ADD_TO_LEAVE_SELECTED, REMOVE_FROM_LEAVE_SELECTED, ADD_ALL_TO_LEAVE_SELECTED, RESET_LEAVE_SELECTED, TOGGLE_LEAVE_FILTERING, RESET_QUERY, FETCH_LEAVE_BY_QUERY, RESET_LEAVE, CREATE_LEAVE, BATCH_DELETE_LEAVE, CONFIRM_UPDATE_LEAVE, BATCH_UPDATE_LEAVE } from "../types/leave"

const initialState = {
    record: [],
    employeeList: [],
    employeeAL: 0,
    applyFrom: "",
    applyTo: "",
    applyType: "sick_leave",
    applySpan: "half_day",
    applyReason: "",
    applyEmployee: "",
    from: "",
    to: "",
    status: "",
    type: "",
    duration: "",
    reason: "",
    employeeId: "",
    leaveId: "",
    firstname: "",
    lastname: "",
    queryText: "",
    queryFrom: "",
    queryTo: "",
    queryType: "",
    queryStatus: "",
    queryEmployeeId: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageLength: "",
    currentLimit: 10,
    isViewing: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
    isFiltering: false,
    isBatchUpdating: false,
    isBatchDeleting: false,
    isAllSelected: false,
    selectedRecord: [],
    batchUpdateDuration: "",
    batchUpdateType: "",
    batchUpdateStatus: ""
}

const leaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEE_AL:
            return {
                ...state,
                employeeAL: action.payload.employeeAL
            }
        case UPDATE_LEAVE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FETCH_LEAVE:
            return {
                ...state,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case FETCH_SPECIFIC_LEAVE:
            return {
                ...state,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                duration: action.payload.duration,
                from: `${new Date(action.payload.from).getFullYear()}-${new Date(action.payload.from).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.from).toLocaleDateString('en-US', { day: "2-digit" })}`,
                to: `${new Date(action.payload.to).getFullYear()}-${new Date(action.payload.to).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.to).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                leaveId: action.payload.leaveId,
                type: action.payload.type
            }
        case TOGGLE_LEAVE_VIEWING:
            return {
                ...state,
                isViewing: action.payload.isViewing,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                duration: action.payload.duration,
                from: `${new Date(action.payload.from).getFullYear()}-${new Date(action.payload.from).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.from).toLocaleDateString('en-US', { day: "2-digit" })}`,
                to: `${new Date(action.payload.to).getFullYear()}-${new Date(action.payload.to).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.to).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                leaveId: action.payload.leaveId,
                type: action.payload.type
            }
        case TOGGLE_LEAVE_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                duration: action.payload.duration,
                from: `${new Date(action.payload.from).getFullYear()}-${new Date(action.payload.from).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.from).toLocaleDateString('en-US', { day: "2-digit" })}`,
                to: `${new Date(action.payload.to).getFullYear()}-${new Date(action.payload.to).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.to).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                leaveId: action.payload.leaveId,
                type: action.payload.type
            }
        case TOGGLE_LEAVE_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                employeeId: action.payload.employeeId,
                reason: action.payload.reason,
                status: action.payload.status,
                duration: action.payload.duration,
                from: `${new Date(action.payload.from).getFullYear()}-${new Date(action.payload.from).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.from).toLocaleDateString('en-US', { day: "2-digit" })}`,
                to: `${new Date(action.payload.to).getFullYear()}-${new Date(action.payload.to).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(action.payload.to).toLocaleDateString('en-US', { day: "2-digit" })}`,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                leaveId: action.payload.leaveId,
                type: action.payload.type
            }
        case TOGGLE_LEAVE_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating
            }
        case TOGGLE_LEAVE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                batchUpdateDuration: action.payload.batchUpdateDuration,
                batchUpdateType: action.payload.batchUpdateType,
                batchUpdateStatus: action.payload.batchUpdateStatus
            }
        case TOGGLE_LEAVE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        case ADD_TO_LEAVE_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_LEAVE_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_TO_LEAVE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case RESET_LEAVE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_LEAVE_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case RESET_QUERY:
            return {
                ...state,
                isFiltering: false,
                queryText: "",
                queryFrom: "",
                queryTo: "",
                queryType: "",
                queryStatus: "",
                queryEmployeeId: "",
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case FETCH_LEAVE_BY_QUERY:
            return {
                ...state,
                isFiltering: action.payload.isFiltering,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit
            }
        case APPLY_LEAVE:
            return {
                ...state,
                applyFrom: action.payload.applyFrom,
                applyTo: action.payload.applyTo,
                applyType: action.payload.applyType,
                applySpan: action.payload.applySpan,
                applyReason: action.payload.applyReason,
                applyEmployee: action.payload.applyEmployee
            }
        case CREATE_LEAVE:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
                applyFrom: action.payload.applyFrom,
                applyTo: action.payload.applyTo,
                applyType: action.payload.applyType,
                applySpan: action.payload.applySpan,
                applyReason: action.payload.applyReason,
                applyEmployee: action.payload.applyEmployee,
            }
        case BATCH_DELETE_LEAVE:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case DELETE_LEAVE:
            return {
                ...state,
                isDeleting: action.payload.isBatchDeleting,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case CONFIRM_UPDATE_LEAVE:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        case BATCH_UPDATE_LEAVE:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating,
                record: action.payload.record,
                employeeList: action.payload.employeeList,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageLength: action.payload.pageLength,
                currentLimit: action.payload.currentLimit,
            }
        default:
            return state
    }
}

export default leaveReducer