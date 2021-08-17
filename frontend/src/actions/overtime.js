import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT } from "../types/overtime";
import { popErrorMessage, popSuccessMessage } from "./ui";
import axios from 'axios'

export const fetchOvertimeStatus = (employee_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/overtime/${employee_id}`)
            dispatch({
                type: FETCH_OVERTIME_STATUS,
                payload: {
                    overtimeCheckIn: res.data.from,
                    overtimeCheckOut: res.data.to
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const createOvertime = (employee_id) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id
            }
            const res = await axios.post('/overtime/timein', body)
            dispatch({
                type: CREATE_OVERTIME_TIMEIN,
                payload: {
                    overtimeCheckIn: res.data.from
                }
            })
            dispatch(popSuccessMessage(`Successfully timed in at ${res.data.from} (OT)`))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const createOvertimeTimeout = (employee_id) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id
            }
            const res = await axios.post('/overtime/timeout', body)
            console.log(res.data)
            dispatch({
                type: CREATE_OVERTIME_TIMEOUT,
                payload: {
                    overtimeCheckOut: res.data.to
                }
            })
            dispatch(popSuccessMessage(`Successfully timed out at ${res.data.to} (OT)`))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}