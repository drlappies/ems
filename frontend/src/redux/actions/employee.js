const employeeActionTypes = {
    GET_EMPLOYEE: "GET_EMPLOYEE",
    GET_EMPLOYEE_SUCCESS: "GET_EMPLOYEE_SUCCESS",
    GET_EMPLOYEE_FAILURE: "GET_EMPLOYEE_FAILURE"
}

export default employeeActionTypes

export function getEmployee(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE,
        payload
    }
}

export function getEmployeeSuccess(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_SUCCESS,
        payload
    }
}

export function getEmployeeFailure(payload) {
    return {
        type: employeeActionTypes.GET_EMPLOYEE_FAILURE,
        payload
    }
}