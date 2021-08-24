import { FETCH_EMPLOYEE, FETCH_SPECIFIC_EMPLOYEE, UPDATE_SPECIFIC_EMPLOYEE, CONFIRM_EMPLOYEE_UPDATE, DELETE_EMPLOYEE, RESET_EMPLOYEE } from '../types/employee'

const initialState = {
    record: [],
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
    currentPage: 0,
    currentPageStart: 0,
    currentPageEnd: 0,
    pageCount: ""
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
                pageCount: action.payload.pageCount
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
                employeeEndHour: action.payload.employeeEndHour
            }
        case UPDATE_SPECIFIC_EMPLOYEE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case CONFIRM_EMPLOYEE_UPDATE:
            return {
                ...state,
                record: state.record.map(el =>
                    el.id === action.payload.employeeId ? {
                        ...el,
                        firstname: action.payload.employeeFirstname,
                        lastname: action.payload.employeeLastname,
                        address: action.payload.employeeAddress,
                        position: action.payload.employeePosition,
                        department: action.payload.employeeDepartment,
                        phone_number: action.payload.employeeNumber,
                        emergency_contact_person: action.payload.employeeContactPerson,
                        emergency_contact_number: action.payload.employeeContactNumber,
                        onboard_date: action.payload.employeeOnboardDate,
                        role: action.payload.employeeRole,
                        status: action.payload.employeeStatus,
                        start_hour: action.payload.employeeStartHour,
                        end_hour: action.payload.employeeEndHour,
                        salary_monthly: action.payload.employeeSalary,
                        ot_pay_entitled: action.payload.employeeOT,
                        ot_hourly_salary: action.payload.employeeOTpay,
                    } : el
                )
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                record: state.record.filter(el => el.id !== action.payload.employeeId)
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
                employeeEndHour: ""
            }
        default:
            return state
    }
}

export default employeeReducer