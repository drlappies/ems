import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT, FETCH_OVERTIME_RECORD, UPDATE_OVERTIME_RECORD } from "../types/overtime";
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

export const fetchOvertimeRecord = (starting, ending, employee_id, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/overtime', {
                params: {
                    starting: starting,
                    ending: ending,
                    page: page,
                    employee_id: employee_id || ""
                }
            })
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtime,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateOvertimeRecord = (id, from, to, status) => {
    return async (dispatch) => {
        try {
            const body = {
                from: from,
                to: to,
                status: status
            }
            const res = await axios.put(`/overtime/${id}`, body)
            dispatch({
                type: UPDATE_OVERTIME_RECORD,
                payload: {
                    id: res.data.update.id,
                    from: res.data.update.from,
                    to: res.data.update.to,
                    status: res.data.update.status
                }
            })
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
            console.log(err)
        }
    }
}

export const fetchNextOvertimeRecord = (starting, ending, employee_id, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/overtime', {
                params: {
                    starting: starting,
                    ending: ending,
                    employee_id: employee_id || "",
                    page: page + 15
                }
            })
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtime,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousOvertimeRecord = (starting, ending, employee_id, page) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/overtime', {
                params: {
                    starting: starting,
                    ending: ending,
                    employee_id: employee_id || "",
                    page: page - 15
                }
            })
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtime,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchByQuery = (starting, ending, employee_id, status) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/overtime', {
                params: {
                    starting: starting,
                    ending: ending,
                    employee_id: employee_id || "",
                    status: status,
                    page: 0
                }
            })
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtime,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createOvertimeRecord = (employee_id, starting, ending, date, status) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id,
                from: starting,
                to: ending,
                date: date,
                status: status ? 'approved' : 'pending'
            }
            const res = await axios.post('/overtime', body)
            console.log(res)
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtime,
                    currentPage: 0,
                    currentPageStart: 1,
                    currentPageEnd: 1,
                    pageLength: res.data.overtime.count
                }
            })
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            console.log(err)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}