import { FETCH_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE } from '../types/attendance'
import { popErrorMessage, popSuccessMessage } from './ui'
import axios from 'axios'

export const fetchAttendance = (currentPage, starting, ending) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: currentPage,
                    starting: starting,
                    ending: ending
                },
            });
            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd
                }
            })
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNext = (page, starting, ending) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: page + 15,
                    starting: starting,
                    ending: ending
                }
            })
            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd
                }
            })
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchPrevious = (page, starting, ending) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: page - 15,
                    starting: starting,
                    ending: ending
                }
            })
            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd
                }
            })
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchByQuery = (starting, ending, employee_id) => {
    return async (dispatch) => {
        try {
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
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd
                }
            })
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const deleteAttendance = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/attendance/${id}`)
            dispatch({
                type: DELETE_ATTENDANCE,
                payload: {
                    id: id
                }
            })
            dispatch(popSuccessMessage(`Successfully deleted attendance record id: ${res.data.id}`))
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateAttendance = (id, check_in, check_out) => {
    return async (dispatch) => {
        try {
            console.log('hits')
            const body = {
                check_in: check_in,
                check_out: check_out
            }
            const res = await axios.put(`/attendance/${id}`, body)
            dispatch({
                type: UPDATE_ATTENDANCE,
                payload: {
                    id: id,
                    check_in: check_in,
                    check_out: check_out
                }
            })
            dispatch(popSuccessMessage(`Successfully updated attendance record id: ${res.data.id}`))
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}