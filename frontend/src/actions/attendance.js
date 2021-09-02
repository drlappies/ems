import { FETCH_ATTENDANCE, UPDATE_ATTENDANCE, FETCH_SPECIFIC_ATTENDANCE, RESET_ATTENDANCE, ADD_SELECTED, REMOVE_SELECTED, RESET_SELECTED, RESET_QUERY, ADD_ALL_SELECTED } from '../types/attendance'
import { popErrorMessage, popSuccessMessage } from './ui'
import axios from 'axios'

export const fetchAttendance = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, currentPage, currentLimit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo
                },
            });

            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchSpecificAttendance = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/attendance/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_ATTENDANCE,
                payload: {
                    attendanceId: res.data.attendance.id,
                    employeeId: res.data.attendance.employee_id,
                    employeeFirstname: res.data.attendance.firstname,
                    employeeLastname: res.data.attendance.lastname,
                    attendanceCheckin: res.data.attendance.check_in,
                    attendanceCheckout: res.data.attendance.check_out,
                    attendanceStatus: res.data.attendance.status,
                    attendanceDate: res.data.attendance.date
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNext = (page, pageLength, limit, starting, ending, name, status) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageLength) return;

            const res = await axios.get('/attendance', {
                params: {
                    page: page + limit,
                    limit: limit,
                    starting: starting,
                    ending: ending,
                    name: name,
                    status: status
                }
            })

            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd,
                    employeeList: res.data.employeeList
                }
            })

        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchPrevious = (page, limit) => {
    return async (dispatch) => {
        try {
            if (page <= 0) return;
            const res = await axios.get('/attendance', {
                params: {
                    page: page - limit,
                    limit: limit
                }
            })
            dispatch({
                type: FETCH_ATTENDANCE,
                payload: {
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd,
                    employeeList: res.data.employeeList
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const deleteAttendance = (ids) => {
    return async (dispatch) => {
        try {
            if (!Array.isArray(ids)) ids = [ids]
            const res = await axios.delete(`/attendance/${ids.map((el, i) => i === 0 ? `?ids=${el}&` : `ids=${el}&`).join("")}`)
            dispatch(fetchAttendance())
            dispatch({ type: RESET_SELECTED })
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateAttendance = (ids, check_in, check_out, status) => {
    return async (dispatch) => {
        try {
            if (!Array.isArray(ids)) ids = [ids];

            const body = {
                check_in: check_in,
                check_out: check_out,
                status: status,
                ids: ids
            }
            const res = await axios.put(`/attendance`, body)
            dispatch(fetchAttendance())
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const createAttendance = (employee_id, date, check_in, check_out, status) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id,
                date: date,
                check_in: check_in,
                check_out: check_out,
                status: status
            }
            const res = await axios.post('/attendance', body)
            dispatch(fetchAttendance())
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleUpdateAttendance = (e, result) => {
    return async (dispatch) => {
        try {
            let { name, value } = result || e.target
            if (e.target.type === 'checkbox') value = e.target.checked
            dispatch({
                type: UPDATE_ATTENDANCE,
                payload: {
                    name: name,
                    value: value
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetAttendance = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_ATTENDANCE
        })
    }
}

export const addToSelected = (id) => {
    return (dispatch) => {
        dispatch({
            type: ADD_SELECTED,
            payload: {
                id: id
            }
        })
    }
}

export const removeFromSelected = (id) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_SELECTED,
            payload: {
                id: id
            }
        })
    }
}

export const resetSelected = () => {
    return (dispatch) => {
        dispatch({ type: RESET_SELECTED })
    }
}

export const resetQuery = () => {
    return (dispatch) => {
        dispatch({ type: RESET_QUERY })
    }
}

export const addAllToSelected = (employeeList) => {
    return (dispatch) => {
        const rowIds = employeeList.map(el => el.id.toString())
        dispatch({
            type: ADD_ALL_SELECTED,
            payload: {
                selectedRecord: rowIds
            }
        })
    }
}