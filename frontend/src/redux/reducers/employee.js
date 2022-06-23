import { networkStatus } from "../../constants/network";
import employeeActionTypes from "../actions/employee"

const initialState = {
    getEmployeeStatus: networkStatus.IDLE,
    employeeList: []
}

const employeeReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case employeeActionTypes.GET_EMPLOYEE:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_IN_PROGRESS
            }

        case employeeActionTypes.GET_EMPLOYEE_SUCCESS:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_SUCCEEDED,
                employeeList: payload.employeeList
            }

        case employeeActionTypes.GET_EMPLOYEE_FAILURE:
            return {
                ...state,
                getEmployeeStatus: networkStatus.FETCH_FAILED
            }

        default:
            return state
    }
}

export default employeeReducer