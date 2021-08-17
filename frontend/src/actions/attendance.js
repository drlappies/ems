import { FETCH_ATTENDANCE, NEXT_ATTENDANCE, PREVIOUS_ATTENDANCE, TO_ATTENDANCE } from '../types/attendance'
import axios from 'axios'

export const fetchAttendance = (currentPage, starting, ending) => {
    return async (dispatch) => {
        const res = await axios.get('/attendance', {
            params: {
                page: currentPage,
                starting: starting,
                ending: ending
            }
        });
        dispatch({
            type: FETCH_ATTENDANCE,
            payload: {
                record: res.data.attendance,
                count: res.data.count.count,
                page: res.data.page
            }
        })
    }
}

export const fetchNext = (nextPage, starting, ending) => {
    return async (dispatch) => {
        const res = await axios.get('/attendance', {
            params: {
                page: nextPage,
                starting: starting,
                ending: ending
            }
        })
        dispatch({
            type: NEXT_ATTENDANCE,
            payload: {
                record: res.data.attendance,
                count: res.data.count.count,
                page: res.data.page
            }
        })
    }
}

export const fetchPrevious = (previousPage, starting, ending) => {
    return async (dispatch) => {
        const res = await axios.get('/attendance', {
            params: {
                page: previousPage,
                starting: starting,
                ending: ending
            }
        })
        dispatch({
            type: PREVIOUS_ATTENDANCE,
            payload: {
                record: res.data.attendance,
                count: res.data.count.count,
                page: res.data.page
            }
        })
    }
}

export const fetchSpecific = (page, starting, ending) => {
    return async (dispatch) => {
        const res = await axios.get('/attendance', {
            params: {
                page: page,
                starting: starting,
                ending: ending
            }
        })
        dispatch({
            type: TO_ATTENDANCE,
            payload: {
                record: res.data.attendance,
                count: res.data.count.count,
                page: res.data.page,
                to: page
            }
        })
    }
}

export const fetchByQuery = (starting, ending, employee_id) => {
    return async (dispatch) => {
        const res = await axios.get('/attendance', {
            params: {
                employee_id: employee_id,
                starting: starting,
                ending: ending,
                page: 0
            }
        })
        dispatch({
            type: FETCH_ATTENDANCE,
            payload: {
                record: res.data.attendance,
                count: res.data.count.count,
                page: res.data.page
            }
        })
    }
}