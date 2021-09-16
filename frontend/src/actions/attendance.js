import { FETCH_ATTENDANCE, DELETE_ATTENDANCE, UPDATE_ATTENDANCE, ADD_TO_ATTENDANCE_SELECTED, REMOVE_FROM_ATTENDANCE_SELECTED, RESET_ATTENDANCE_SELECTED, ADD_ALL_TO_ATTENDANCE_SELECTED, UPDATE_ATTENDANCE_ROW, TOGGLE_ATTENDANCE_UPDATING, TOGGLE_ATTENDANCE_CREATING, TOGGLE_ATTENDANCE_DELETING, TOGGLE_ATTENDANCE_FILTERING, TOGGLE_ATTENDANCE_BATCH_DELETING, TOGGLE_ATTENDANCE_BATCH_UPDATING, BATCH_DELETE_ATTENDANCE, UPDATE_ATTENDANCE_RECORD, BATCH_UPDATE_ATTENDANCE, CREATE_ATTENDANCE, FETCH_ATTENDANCE_BY_FILTER, RESET_ATTENDANCE_QUERY } from '../types/attendance'
import { popErrorMessage, popSuccessMessage } from './ui'
import axios from 'axios'

export const fetchAttendance = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/attendance');
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

export const fetchAttendanceByQuery = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, currentPage, currentLimit, queryEmployeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/attendance', {
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
                    checkoutTo: queryCheckoutTo,
                    employee_id: queryEmployeeId
                }
            })

            dispatch({
                type: FETCH_ATTENDANCE_BY_FILTER,
                payload: {
                    isFiltering: false,
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

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            let res
            if (id) {
                res = await axios.get(`/api/attendance/${id}`)
                window.history.replaceState(null, null, `/attendance/${id}/update`)
            } else {
                window.history.replaceState(null, null, '/attendance')
            }
            dispatch({
                type: TOGGLE_ATTENDANCE_UPDATING,
                payload: {
                    attendanceId: id ? res.data.attendance.id : "",
                    employeeId: id ? res.data.attendance.employee_id : "",
                    employeeFirstname: id ? res.data.attendance.firstname : "",
                    employeeLastname: id ? res.data.attendance.lastname : "",
                    attendanceCheckin: id ? res.data.attendance.check_in : "",
                    attendanceCheckout: id ? res.data.attendance.check_out : "",
                    attendanceStatus: id ? res.data.attendance.status : "",
                    attendanceDate: id ? res.data.attendance.date : ""
                }
            })

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

        dispatch({
            type: TOGGLE_ATTENDANCE_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        if (!isFiltering) {
            window.history.replaceState(null, "", '/attendance/search')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({
            type: TOGGLE_ATTENDANCE_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        if (!isBatchUpdating) {
            window.history.replaceState(null, "", '/attendance/updatebatch')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({
            type: TOGGLE_ATTENDANCE_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating,
                updateAttendanceCheckin: "",
                updateAttendanceCheckout: "",
                updateAttendanceStatus: "",
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        if (!isBatchDeleting) {
            window.history.replaceState(null, "", '/attendance/deletebatch')
        } else {
            window.history.replaceState(null, "", '/attendance')
        }

        dispatch({
            type: TOGGLE_ATTENDANCE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res
            if (id) {
                res = await axios.get(`/api/attendance/${id}`)
                window.history.replaceState(null, null, `/attendance/${id}/delete`)
            } else {
                window.history.replaceState(null, null, '/attendance')
            }
            dispatch({
                type: TOGGLE_ATTENDANCE_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    attendanceId: id ? res.data.attendance.id : "",
                    employeeId: id ? res.data.attendance.employee_id : "",
                    employeeFirstname: id ? res.data.attendance.firstname : "",
                    employeeLastname: id ? res.data.attendance.lastname : "",
                    attendanceCheckin: id ? res.data.attendance.check_in : "",
                    attendanceCheckout: id ? res.data.attendance.check_out : "",
                    attendanceStatus: id ? res.data.attendance.status : "",
                    attendanceDate: id ? res.data.attendance.date : ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNext = (page, pageLength, limit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            if (page + limit >= pageLength) return;
            const res = await axios.get('/api/attendance', {
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
            if (page <= 0) return;
            const res = await axios.get('/api/attendance', {
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

export const deleteAttendance = (id, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/attendance/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/attendance', {
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
                type: DELETE_ATTENDANCE,
                payload: {
                    isDeleting: false,
                    record: res2.data.attendance,
                    count: res2.data.count.count,
                    page: res2.data.currentPage,
                    pageStart: res2.data.pageStart,
                    pageEnd: res2.data.pageEnd,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit
                }
            })
            window.history.replaceState(null, null, '/attendance')
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const batchDeleteAttendance = (id, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/attendance/${id.map((el, i) => i === 0 ? `?id=${el}&` : `id=${el}&`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/attendance', {
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
                type: BATCH_DELETE_ATTENDANCE,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.attendance,
                    count: res2.data.count.count,
                    page: res2.data.currentPage,
                    pageStart: res2.data.pageStart,
                    pageEnd: res2.data.pageEnd,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit,
                    selectedRecord: [],
                    isAttendanceAllSelected: false
                }
            })
            window.history.replaceState(null, null, '/attendance')
        } catch (err) {
            console.log(err.response.data.error)
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateAttendance = (id, check_in, check_out, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const body = {
                check_in: check_in,
                check_out: check_out,
                status: status,
            }
            const res = await axios.put(`/api/attendance/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/attendance', {
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
                type: UPDATE_ATTENDANCE_RECORD,
                payload: {
                    isUpdating: false,
                    record: res2.data.attendance,
                    count: res2.data.count.count,
                    page: res2.data.currentPage,
                    pageStart: res2.data.pageStart,
                    pageEnd: res2.data.pageEnd,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateBatchAttendance = (id, check_in, check_out, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const body = {
                check_in: check_in,
                check_out: check_out,
                status: status,
                id: id
            }
            const res = await axios.put('/api/attendance', body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/attendance', {
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
                type: BATCH_UPDATE_ATTENDANCE,
                payload: {
                    isBatchUpdating: false,
                    record: res2.data.attendance,
                    count: res2.data.count.count,
                    page: res2.data.currentPage,
                    pageStart: res2.data.pageStart,
                    pageEnd: res2.data.pageEnd,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createAttendance = (employee_id, date, check_in, check_out, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id,
                date: date,
                check_in: check_in,
                check_out: check_out,
                status: status
            }
            const res = await axios.post('/api/attendance', body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/attendance', {
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
                type: CREATE_ATTENDANCE,
                payload: {
                    isCreating: false,
                    record: res2.data.attendance,
                    count: res2.data.count.count,
                    page: res2.data.currentPage,
                    pageStart: res2.data.pageStart,
                    pageEnd: res2.data.pageEnd,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleUpdateAttendance = (e) => {
    return async (dispatch) => {
        try {
            let { name, value } = e.target
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
        dispatch({
            type: e.target.checked ? ADD_TO_ATTENDANCE_SELECTED : REMOVE_FROM_ATTENDANCE_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const toggleSelectAll = (e, entries) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_ATTENDANCE_SELECTED : RESET_ATTENDANCE_SELECTED,
            payload: {
                selectedRecord: e.target.checked ? entries = entries.map(el => el.id.toString()) : [],
                isAttendanceAllSelected: e.target.checked
            }
        })
    }
}

export const resetQuery = (page, limit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/attendance', {
                params: {
                    page: page,
                    limit: limit
                }
            })
            dispatch({
                type: RESET_ATTENDANCE_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.attendance,
                    count: res.data.count.count,
                    page: res.data.currentPage,
                    pageStart: res.data.pageStart,
                    pageEnd: res.data.pageEnd,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit,
                    queryText: "",
                    queryStatus: "",
                    queryDateFrom: "",
                    queryDateTo: "",
                    queryCheckinFrom: "",
                    queryCheckinTo: "",
                    queryCheckoutFrom: "",
                    queryCheckoutTo: "",
                    queryEmployeeId: ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateRow = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, currentPage, newLimit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/attendance', {
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
                type: UPDATE_ATTENDANCE_ROW,
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