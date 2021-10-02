import axios from 'axios'
import { popMessage } from './ui'
import { LOGIN, LOGOUT } from '../types/auth'

export const verifyThunk = (token, history) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/auth/verify', {
                headers: {
                    'token': token
                }
            })
            dispatch({
                type: LOGIN,
                payload: {
                    isAuthenticated: true,
                    id: res.data.payload.id,
                    department: res.data.payload.department,
                    position: res.data.payload.position,
                    address: res.data.payload.address,
                    phone_number: res.data.payload.phone_number,
                    emergency_contact_person: res.data.payload.emergency_contact_person,
                    emergency_contact_number: res.data.payload.emergency_contact_number,
                    onboard_date: res.data.payload.onboard_date,
                    role: res.data.payload.role,
                    start_hour: res.data.payload.start_hour,
                    end_hour: res.data.payload.end_hour,
                    ot_pay_entitled: res.data.payload.ot_pay_entitled,
                    ot_hourly_salary: res.data.payload.ot_hourly_salary,
                    annual_leave_count: res.data.payload.annual_leave_count,
                    username: res.data.payload.username,
                    firstname: res.data.payload.firstname,
                    lastname: res.data.payload.lastname
                }
            })
            window.localStorage.setItem('jwt', res.data.token)
        } catch (err) {
            window.localStorage.removeItem('jwt')
            history.push('/')
            dispatch({
                type: LOGOUT
            })
        }
    }
}

export const loginThunk = (username, password, history) => {
    return async (dispatch) => {
        try {
            const body = {
                username: username,
                password: password
            }
            const res = await axios.post('/api/auth/login', body, {
                withCredentials: true
            })
            dispatch({
                type: LOGIN,
                payload: {
                    isAuthenticated: true,
                    id: res.data.payload.id,
                    department: res.data.payload.department,
                    position: res.data.payload.position,
                    address: res.data.payload.address,
                    phone_number: res.data.payload.phone_number,
                    emergency_contact_person: res.data.payload.emergency_contact_person,
                    emergency_contact_number: res.data.payload.emergency_contact_number,
                    onboard_date: res.data.payload.onboard_date,
                    role: res.data.payload.role,
                    start_hour: res.data.payload.start_hour,
                    end_hour: res.data.payload.end_hour,
                    ot_pay_entitled: res.data.payload.ot_pay_entitled,
                    ot_hourly_salary: res.data.payload.ot_hourly_salary,
                    annual_leave_count: res.data.payload.annual_leave_count,
                    username: res.data.payload.username,
                    firstname: res.data.payload.firstname,
                    lastname: res.data.payload.lastname
                }
            })
            dispatch(popMessage(`Welcome, ${res.data.payload.lastname} ${res.data.payload.firstname}`, 'success'))
            window.localStorage.setItem('jwt', res.data.token)
            history.push('/user')
        } catch (err) {
            console.log(err)
            dispatch(popMessage(err.response.data.error, "error"))
        }
    }
}

export const logoutThunk = (history) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT })
        dispatch(popMessage('Logged out successfully!', 'success'))
        window.localStorage.removeItem('jwt')
        history.push('/')
    }
}