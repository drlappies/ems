import { CHECK_IN, CHECK_OUT, FETCH_PUNCH_STATUS } from '../types/punch'
import axios from 'axios'
import { popMessage } from './ui'

export const timeInThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId
            }
            const res = await axios.post('/api/attendance/checkin', body, {
                headers: {
                    'jwt': window.localStorage.getItem('jwt')
                }
            })
            dispatch({
                type: CHECK_IN,
                payload: {
                    checkInTime: res.data.timeIn.check_in,
                    status: res.data.timeIn.status
                }
            })
            dispatch(popMessage(res.data.success, 'sucess'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }
}

export const timeOutThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId
            }
            const res = await axios.post('/api/attendance/checkout', body, {
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
            dispatch(popMessage(res.data.success, 'sucess'))
        } catch (err) {
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }
}

export const fetchPunchStatusThunk = (employeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/attendance/status/${employeeId}`, {
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
            dispatch(popMessage(err.response.data.error, 'error'))
        }
    }
}