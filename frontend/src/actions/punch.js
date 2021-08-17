import { CHECK_IN, CHECK_OUT, FETCH_PUNCH_STATUS } from '../types/punch'
import axios from 'axios'
import { popMessage } from './ui'

export const timeInThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId
            }
            const res = await axios.post('/attendance/time-in', body, {
                headers: {
                    'jwt': window.localStorage.getItem('jwt')
                }
            })
            console.log(res)
            dispatch({
                type: CHECK_IN,
                payload: {
                    checkInTime: res.data.timeIn.check_in,
                    status: res.data.timeIn.status
                }
            })
            dispatch(popMessage(res.data.success, 'SUCCESS'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'ERROR'))
        }
    }
}

export const timeOutThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId
            }
            const res = await axios.post('/attendance/time-out', body, {
                headers: {
                    'jwt': window.localStorage.getItem('jwt')
                }
            })
            dispatch({
                type: CHECK_OUT,
                payload: {
                    checkOutTime: res.data.timeout
                }
            })
            dispatch(popMessage(res.data.success, 'SUCCESS'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'ERROR'))
        }
    }
}

export const fetchPunchStatusThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/attendance/${employeeId}`, {
                headers: {
                    'jwt': window.localStorage.getItem('jwt')
                }
            })
            if (res.data.hasOwnProperty('id')) {
                dispatch({
                    type: FETCH_PUNCH_STATUS,
                    payload: {
                        checkInTime: res.data.check_in,
                        checkOutTime: res.data.check_out,
                        status: res.data.status
                    }
                })
            } else {
                dispatch({
                    type: FETCH_PUNCH_STATUS,
                    payload: {
                        checkInTime: null,
                        checkOutTime: null,
                        status: null
                    }
                })
            }
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'ERROR'))
        }
    }
}