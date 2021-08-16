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
            dispatch({
                type: 'CHECKIN',
                payload: res.data.timein
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
                type: 'CHECKOUT',
                payload: res.data.timeout
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
            console.log(res)
            if (res.data.hasOwnProperty('id')) {
                dispatch({
                    type: 'STATUS',
                    payload: {
                        checkInTime: res.data.check_in,
                        checkOutTime: res.data.check_out,
                        status: res.data.status
                    }
                })
                console.log(res.data)
            } else {
                dispatch({
                    type: 'STATUS',
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