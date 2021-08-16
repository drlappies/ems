import axios from 'axios'
import { popMessage } from './ui'

export const verifyThunk = (token) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/auth/verify', {}, {
                headers: {
                    'token': token
                }
            })
            dispatch({
                type: 'LOGIN',
                payload: {
                    id: res.data.payload.id,
                    username: res.data.payload.username,
                    firstname: res.data.payload.firstname,
                    lastname: res.data.payload.lastname,
                    role: res.data.payload.role,
                    ot_entitled: res.data.payload.ot_entitled,
                }
            })
            window.localStorage.setItem('jwt', res.data.token)
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'LOGOUT'
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
            const res = await axios.post('/auth/login', body, {
                withCredentials: true
            })
            dispatch({
                type: 'LOGIN',
                payload: {
                    id: res.data.payload.id,
                    username: res.data.payload.username,
                    firstname: res.data.payload.firstname,
                    lastname: res.data.payload.lastname,
                    role: res.data.payload.role,
                    ot_entitled: res.data.payload.ot_entitled,
                }
            })
            window.localStorage.setItem('jwt', res.data.token)
            history.push('/dashboard')
        } catch (err) {
            dispatch(popMessage(err.response.data.message, 'ERROR'))
        }
    }
}

export const logoutThunk = (history) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
        window.localStorage.removeItem('jwt')
        history.push('/')
    }
}