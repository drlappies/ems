import { FETCH_ATTENDANCE, UPDATE_ATTENDANCE, ADD_SELECTED, REMOVE_SELECTED, RESET_SELECTED, RESET_QUERY, ADD_ALL_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_FILTERING, TOGGLE_BATCH_UPDATING, TOGGLE_BATCH_DELETING, TOGGLE_DELETING, UPDATE_ROW } from '../types/attendance'
import { popErrorMessage, popSuccessMessage } from './ui'
import axios from 'axios'

export const fetchAttendance = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance');
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

export const fetchAttendanceByQuery = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, currentPage, currentLimit) => {
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
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })

            dispatch({ type: TOGGLE_FILTERING })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            if (id) {
                const res = await axios.get(`/attendance/${id}`)
                dispatch({
                    type: TOGGLE_UPDATING,
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
                window.history.replaceState(null, "", `/attendance/${id}/update`)
            }
            else {
                dispatch({
                    type: TOGGLE_UPDATING,
                    payload: {
                        attendanceId: "",
                        employeeId: "",
                        employeeFirstname: "",
                        employeeLastname: "",
                        attendanceCheckin: "",
                        attendanceCheckout: "",
                        attendanceStatus: "",
                        attendanceDate: ""
                    }
                })
                window.history.replaceState(null, "", '/attendance')
            }
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        if (!isCreating) {
            window.history.replaceState(null, "", '/attendance/create')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({ type: TOGGLE_CREATING })
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        if (!isFiltering) {
            window.history.replaceState(null, "", '/attendance/search')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({ type: TOGGLE_FILTERING })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        if (!isBatchUpdating) {
            window.history.replaceState(null, "", '/attendance/updatebatch')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({ type: TOGGLE_BATCH_UPDATING })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        if (!isBatchDeleting) {
            window.history.replaceState(null, "", '/attendance/deletebatch')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({ type: TOGGLE_BATCH_DELETING })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            if (id) {
                const res = await axios.get(`/attendance/${id}`)
                dispatch({
                    type: TOGGLE_DELETING,
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
                window.history.replaceState(null, "", `/attendance/${id}/delete`)
            }
            else {
                dispatch({
                    type: TOGGLE_DELETING,
                    payload: {
                        attendanceId: "",
                        employeeId: "",
                        employeeFirstname: "",
                        employeeLastname: "",
                        attendanceCheckin: "",
                        attendanceCheckout: "",
                        attendanceStatus: "",
                        attendanceDate: ""
                    }
                })
                window.history.replaceState(null, "", '/attendance')
            }
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNext = (page, pageLength, limit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageLength) return;

            const res = await axios.get('/attendance', {
                params: {
                    page: page + limit,
                    limit: limit,
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo
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

export const fetchPrevious = (page, limit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: page - limit,
                    limit: limit,
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo
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
            const res = await axios.delete(`/attendance/?ids=${ids}`)
            dispatch({
                type: TOGGLE_DELETING,
                payload: {
                    attendanceId: "",
                    employeeId: "",
                    employeeFirstname: "",
                    employeeLastname: "",
                    attendanceCheckin: "",
                    attendanceCheckout: "",
                    attendanceStatus: "",
                    attendanceDate: ""
                }
            })
            dispatch(fetchAttendance())
            dispatch(popSuccessMessage(res.data.success))
            window.history.replaceState(null, "", '/attendance')
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const batchDeleteAttendance = (ids) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/attendance/${ids.map((el, i) => i === 0 ? `?ids=${el}&` : `ids=${el}&`).join("")}`)
            dispatch(fetchAttendance())
            dispatch({ type: RESET_SELECTED })
            dispatch({ type: TOGGLE_BATCH_DELETING })
            dispatch(popSuccessMessage(res.data.success))
            window.history.replaceState(null, "", '/attendance')
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateAttendance = (id, check_in, check_out, status) => {
    return async (dispatch) => {
        try {
            id = [id]
            const body = {
                check_in: check_in,
                check_out: check_out,
                status: status,
                ids: id
            }
            const res = await axios.put('/attendance', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchAttendance())
            dispatch({
                type: TOGGLE_UPDATING,
                payload: {
                    attendanceId: "",
                    employeeId: "",
                    employeeFirstname: "",
                    employeeLastname: "",
                    attendanceCheckin: "",
                    attendanceCheckout: "",
                    attendanceStatus: "",
                    attendanceDate: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateBatchAttendance = (ids, check_in, check_out, status) => {
    return async (dispatch) => {
        try {
            const body = {
                check_in: check_in,
                check_out: check_out,
                status: status,
                ids: ids
            }
            const res = await axios.put('/attendance', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchAttendance())
            dispatch({ type: TOGGLE_BATCH_UPDATING })
        } catch (err) {
            console.log(err)
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
            dispatch({ type: TOGGLE_CREATING })
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

export const toggleSelect = (e) => {
    return (dispatch) => {
        if (!e.target.checked) {
            dispatch({
                type: REMOVE_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        } else {
            dispatch({
                type: ADD_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        }
    }
}

export const toggleSelectAll = (e, entries) => {
    return (dispatch) => {
        if (e.target.checked) {
            const ids = entries.map(el => el.id.toString())
            dispatch({
                type: ADD_ALL_SELECTED,
                payload: {
                    selectedRecord: ids
                }
            })
        } else {
            dispatch({ type: RESET_SELECTED })
        }
    }
}

export const resetQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: page,
                    limit: limit
                }
            })
            dispatch({
                type: RESET_QUERY,
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
            dispatch({ type: TOGGLE_FILTERING })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateRow = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, currentPage, newLimit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/attendance', {
                params: {
                    page: currentPage,
                    limit: newLimit,
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo
                }
            })
            dispatch({
                type: UPDATE_ROW,
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
            console.log(err)
        }
    }
}