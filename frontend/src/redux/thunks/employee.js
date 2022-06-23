import fetch from '../../axios'
import employeeApi from '../../apis/employee'
import * as employeeAction from '../actions/employee'

export function getEmployee(offset, limit) {
    return async (dispatch) => {
        dispatch(employeeAction.getEmployee())
        try {
            const res = await fetch(employeeApi.getEmployee.api, employeeApi.getEmployee.method, {
                params: {
                    offset: offset,
                    limit: limit
                }
            })

            const payload = {
                employeeList: res.data.result
            }

            dispatch(employeeAction.getEmployeeSuccess(payload))
        } catch (error) {
            dispatch(employeeAction.getEmployeeFailure(error))
        }
    }
}

