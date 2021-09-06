import { TOGGLE_EMPLOYEE_BATCH_DELETING, FETCH_EMPLOYEE, FETCH_SPECIFIC_EMPLOYEE, UPDATE_SPECIFIC_EMPLOYEE, RESET_EMPLOYEE, TOGGLE_EMPLOYEE_CREATING, TOGGLE_EMPLOYEE_VIEWING, TOGGLE_EMPLOYEE_UPDATING, TOGGLE_EMPLOYEE_DELETING, TOGGLE_EMPLOYEE_FILTERING, RESET_EMPLOYEE_QUERY, ADD_TO_EMPLOYEE_SELECTED, REMOVE_FROM_EMPLOYEE_SELECTED, ADD_ALL_EMPLOYEE_SELECTED, REMOVE_ALL_EMPLOYEE_SELECTED, TOGGLE_EMPLOYEE_BATCH_UPDATING } from '../types/employee'

const initialState = {
    record: [],
    selectedRecord: [],
    employeeId: "",
    employeeFirstname: "",
    employeeLastname: "",
    employeeAddress: "",
    employeePosition: "",
    employeePositionId: "",
    employeeDepartment: "",
    employeeDepartmentId: "",
    employeeNumber: "",
    employeeContactPerson: "",
    employeeContactNumber: "",
    employeeOnboardDate: "",
    employeeRole: "",
    employeeSalary: "",
    employeeOT: false,
    employeeOTpay: "",
    employeeStatus: "",
    employeeStartHour: "",
    employeeEndHour: "",
    employeeUsername: "",
    employeePassword: "",
    employeeAL: "",
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    currentLimit: 0,
    pageCount: "",
    queryJoinFrom: "",
    queryJoinTo: "",
    queryText: "",
    queryStatus: "",
    queryPosition: "",
    queryDepartment: "",
    isViewing: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
    isFiltering: false,
    isBatchDeleting: false,
    isBatchUpdating: false,
    positions: [],
    departments: [],
    batchUpdateStatus: "",
    batchUpdateRole: "",
    batchUpdateStartHour: "",
    batchUpdateEndHour: "",
    batchUpdateMonthlySalary: "",
    batchUpdateOTentitlement: false,
    batchUpdateOTHourlyPay: "",
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEE:
            return {
                ...state,
                record: action.payload.record,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                pageCount: action.payload.pageCount,
                positions: action.payload.positions,
                departments: action.payload.departments,
                currentLimit: action.payload.currentLimit
            }
        case FETCH_SPECIFIC_EMPLOYEE:
            return {
                ...state,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                employeeAddress: action.payload.employeeAddress,
                employeePosition: action.payload.employeePosition,
                employeePositionId: action.payload.employeePositionId,
                employeeDepartment: action.payload.employeeDepartment,
                employeeDepartmentId: action.payload.employeeDepartmentId,
                employeeNumber: action.payload.employeeNumber,
                employeeContactPerson: action.payload.employeeContactPerson,
                employeeContactNumber: action.payload.employeeContactNumber,
                employeeOnboardDate: action.payload.employeeOnboardDate,
                employeeRole: action.payload.employeeRole,
                employeeSalary: action.payload.employeeSalary,
                employeeOT: action.payload.employeeOT,
                employeeOTpay: action.payload.employeeOTpay,
                employeeStatus: action.payload.employeeStatus,
                employeeStartHour: action.payload.employeeStartHour,
                employeeEndHour: action.payload.employeeEndHour,
                employeeAL: action.payload.employeeAL
            }
        case UPDATE_SPECIFIC_EMPLOYEE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case RESET_EMPLOYEE:
            return {
                ...state,
                employeeId: "",
                employeeFirstname: "",
                employeeLastname: "",
                employeeAddress: "",
                employeePosition: "",
                employeePositionId: "",
                employeeDepartment: "",
                employeeDepartmentId: "",
                employeeNumber: "",
                employeeContactPerson: "",
                employeeContactNumber: "",
                employeeOnboardDate: "",
                employeeRole: "employee",
                employeeSalary: "",
                employeeOT: false,
                employeeOTpay: "",
                employeeStatus: "",
                employeeStartHour: "",
                employeeEndHour: "",
                employeeUsername: "",
                employeePassword: ""
            }
        case TOGGLE_EMPLOYEE_CREATING:
            return {
                ...state,
                isCreating: action.payload.isCreating,
                employeeId: "",
                employeeFirstname: "",
                employeeLastname: "",
                employeeAddress: "",
                employeePosition: "",
                employeePositionId: "",
                employeeDepartment: "",
                employeeDepartmentId: "",
                employeeNumber: "",
                employeeContactPerson: "",
                employeeContactNumber: "",
                employeeOnboardDate: "",
                employeeRole: "",
                employeeSalary: "",
                employeeOT: false,
                employeeOTpay: "",
                employeeStatus: "",
                employeeStartHour: "",
                employeeEndHour: "",
                employeeAL: ""
            }
        case TOGGLE_EMPLOYEE_VIEWING:
            return {
                ...state,
                isViewing: action.payload.isViewing,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                employeeAddress: action.payload.employeeAddress,
                employeePosition: action.payload.employeePosition,
                employeePositionId: action.payload.employeePositionId,
                employeeDepartment: action.payload.employeeDepartment,
                employeeDepartmentId: action.payload.employeeDepartmentId,
                employeeNumber: action.payload.employeeNumber,
                employeeContactPerson: action.payload.employeeContactPerson,
                employeeContactNumber: action.payload.employeeContactNumber,
                employeeOnboardDate: action.payload.employeeOnboardDate,
                employeeRole: action.payload.employeeRole,
                employeeSalary: action.payload.employeeSalary,
                employeeOT: action.payload.employeeOT,
                employeeOTpay: action.payload.employeeOTpay,
                employeeStatus: action.payload.employeeStatus,
                employeeStartHour: action.payload.employeeStartHour,
                employeeEndHour: action.payload.employeeEndHour,
                employeeAL: action.payload.employeeAL,
            }
        case TOGGLE_EMPLOYEE_UPDATING:
            return {
                ...state,
                isUpdating: action.payload.isUpdating,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                employeeAddress: action.payload.employeeAddress,
                employeePosition: action.payload.employeePosition,
                employeePositionId: action.payload.employeePositionId,
                employeeDepartment: action.payload.employeeDepartment,
                employeeDepartmentId: action.payload.employeeDepartmentId,
                employeeNumber: action.payload.employeeNumber,
                employeeContactPerson: action.payload.employeeContactPerson,
                employeeContactNumber: action.payload.employeeContactNumber,
                employeeOnboardDate: action.payload.employeeOnboardDate,
                employeeRole: action.payload.employeeRole,
                employeeSalary: action.payload.employeeSalary,
                employeeOT: action.payload.employeeOT,
                employeeOTpay: action.payload.employeeOTpay,
                employeeStatus: action.payload.employeeStatus,
                employeeStartHour: action.payload.employeeStartHour,
                employeeEndHour: action.payload.employeeEndHour,
                employeeAL: action.payload.employeeAL,
                employeeUsername: action.payload.employeeUsername,
                employeePassword: action.payload.employeePassword
            }
        case TOGGLE_EMPLOYEE_DELETING:
            return {
                ...state,
                isDeleting: action.payload.isDeleting,
                employeeId: action.payload.employeeId,
                employeeFirstname: action.payload.employeeFirstname,
                employeeLastname: action.payload.employeeLastname,
                employeePosition: action.payload.employeePosition,
                employeePositionId: action.payload.employeePositionId,
                employeeDepartment: action.payload.employeeDepartment,
                employeeDepartmentId: action.payload.employeeDepartmentId
            }
        case TOGGLE_EMPLOYEE_FILTERING:
            return {
                ...state,
                isFiltering: action.payload.isFiltering
            }
        case RESET_EMPLOYEE_QUERY:
            return {
                record: action.payload.record,
                count: action.payload.count,
                currentPage: action.payload.currentPage,
                currentPageStart: action.payload.currentPageStart,
                currentPageEnd: action.payload.currentPageEnd,
                currentLimit: action.payload.currentLimit,
                positions: action.payload.positions,
                departments: action.payload.departments
            }
        case ADD_TO_EMPLOYEE_SELECTED:
            return {
                ...state,
                selectedRecord: [...state.selectedRecord, action.payload.id]
            }
        case REMOVE_FROM_EMPLOYEE_SELECTED:
            return {
                ...state,
                selectedRecord: state.selectedRecord.filter(el => el !== action.payload.id)
            }
        case ADD_ALL_EMPLOYEE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case REMOVE_ALL_EMPLOYEE_SELECTED:
            return {
                ...state,
                selectedRecord: action.payload.id
            }
        case TOGGLE_EMPLOYEE_BATCH_UPDATING:
            return {
                ...state,
                isBatchUpdating: action.payload.isBatchUpdating
            }

        case TOGGLE_EMPLOYEE_BATCH_DELETING:
            return {
                ...state,
                isBatchDeleting: action.payload.isBatchDeleting
            }
        default:
            return state
    }
}

export default employeeReducer