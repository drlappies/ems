import { CREATE_OVERTIME_TIMEIN, FETCH_OVERTIME_STATUS, CREATE_OVERTIME_TIMEOUT, FETCH_OVERTIME_RECORD, TOGGLE_FILTERING, UPDATE_OVERTIME, ADD_TO_SELECTED, REMOVE_FROM_SELECTED, RESET_SELECTED, TOGGLE_UPDATING, TOGGLE_CREATING, TOGGLE_DELETING, TOGGLE_BATCH_UPDATING, RESET_OVERTIME_QUERY, TOGGLE_BATCH_DELETING, ADD_ALL_TO_SELECTED, FETCH_OVERTIME_BY_FILTER, UPDATE_OVERTIME_RECORD, BATCH_UPDATE_OVERTIME, CREATE_OVERTIME, DELETE_OVERTIME, BATCH_DELETE_OVERTIME } from "../types/overtime";
import { popErrorMessage, popSuccessMessage } from "./ui";
import axios from 'axios'

export const fetchOvertimeStatus = (employee_id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/overtime/status/${employee_id}`)
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

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/api/overtime/${id}`)
                window.history.replaceState(null, null, `/overtime/${id}/update`)
            } else {
                window.history.replaceState(null, null, '/overtime')
            }
            dispatch({
                type: TOGGLE_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    overtimeId: id ? res.data.overtime.id : "",
                    overtimeEmployeeId: id ? res.data.overtime.employee_id : "",
                    overtimeEmployeeFirstname: id ? res.data.overtime.firstname : "",
                    overtimeEmployeeLastname: id ? res.data.overtime.lastname : "",
                    overtimeFrom: id ? res.data.overtime.from : "",
                    overtimeTo: id ? res.data.overtime.to : "",
                    overtimeDate: id ? res.data.overtime.date : "",
                    overtimeStatus: id ? res.data.overtime.status : ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        if (isCreating) {
            window.history.replaceState(null, "", '/overtime')
        } else {
            window.history.replaceState(null, "", '/overtime/create')
        }

        dispatch({
            type: TOGGLE_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/api/overtime/${id}`)
                window.history.replaceState(null, null, `/overtime/${id}/delete`)
            } else {
                window.history.replaceState(null, null, '/overtime')
            }

            dispatch({
                type: TOGGLE_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    overtimeId: id ? res.data.overtime.id : "",
                    overtimeEmployeeId: id ? res.data.overtime.employee_id : "",
                    overtimeEmployeeFirstname: id ? res.data.overtime.firstname : "",
                    overtimeEmployeeLastname: id ? res.data.overtime.lastname : "",
                    overtimeFrom: id ? res.data.overtime.from : "",
                    overtimeTo: id ? res.data.overtime.to : "",
                    overtimeDate: id ? res.data.overtime.date : "",
                    overtimeStatus: id ? res.data.overtime.status : ""
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        if (!isFiltering) {
            window.history.replaceState(null, "", "/overtime/search")
        } else {
            window.history.replaceState(null, "", "/overtime")
        }

        dispatch({
            type: TOGGLE_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        if (!isBatchUpdating) {
            window.history.replaceState(null, "", "/overtime/updatebatch")
        } else {
            window.history.replaceState(null, "", "/overtime")
        }
        dispatch({
            type: TOGGLE_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        if (!isBatchDeleting) {
            window.history.replaceState(null, "", "/overtime/deletebatch")
        } else {
            window.history.replaceState(null, "", "/overtime")
        }
        dispatch({
            type: TOGGLE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const createOvertime = (employee_id) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id
            }
            const res = await axios.post('/api/overtime/timein', body)
            dispatch({
                type: CREATE_OVERTIME_TIMEIN,
                payload: {
                    overtimeCheckIn: res.data.timein
                }
            })
            dispatch(popSuccessMessage(res.data.success))
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
            const res = await axios.post('/api/overtime/timeout', body)
            dispatch({
                type: CREATE_OVERTIME_TIMEOUT,
                payload: {
                    overtimeCheckOut: res.data.timeout
                }
            })
            dispatch(popSuccessMessage(res.data.success))
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchNextOvertimeRecord = (currentPage, pageLength, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            if (currentPage + currentLimit >= pageLength) return;
            const res = await axios.get('/api/overtime', {
                params: {
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo,
                    page: currentPage + currentLimit,
                    limit: currentLimit,
                }
            })

            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtimeRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.pageCount,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousOvertimeRecord = (currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            if (currentPage <= 0) return;
            const res = await axios.get('/api/overtime', {
                params: {
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateto: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo,
                    page: currentPage - currentLimit,
                }
            })

            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtimeRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.pageCount,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchOvertimeRecord = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/overtime')
            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtimeRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.pageCount,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchOvertimeRecordByEntries = (newLimit, currentPage, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            console.log(newLimit)
            const res = await axios.get('/api/overtime', {
                params: {
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo,
                    limit: newLimit,
                    page: currentPage
                }
            })

            dispatch({
                type: FETCH_OVERTIME_RECORD,
                payload: {
                    record: res.data.overtimeRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.pageCount,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchOvertimeRecordByQuery = (queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo, queryEmployeeId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/overtime', {
                params: {
                    text: queryText,
                    status: queryStatus,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    checkinFrom: queryCheckinFrom,
                    checkinTo: queryCheckinTo,
                    checkoutFrom: queryCheckoutFrom,
                    checkoutTo: queryCheckoutTo,
                    employeeId: queryEmployeeId
                }
            })

            dispatch({
                type: FETCH_OVERTIME_BY_FILTER,
                payload: {
                    isFiltering: false,
                    record: res.data.overtimeRecord,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.pageStart,
                    currentPageEnd: res.data.pageEnd,
                    pageLength: res.data.pageCount,
                    employeeList: res.data.employeeList,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const resetOvertimeQuery = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/overtime')

        dispatch({
            type: RESET_OVERTIME_QUERY,
            payload: {
                isFiltering: false,
                record: res.data.overtimeRecord,
                currentPage: res.data.currentPage,
                currentPageStart: res.data.pageStart,
                currentPageEnd: res.data.pageEnd,
                pageLength: res.data.pageCount,
                employeeList: res.data.employeeList,
                currentLimit: res.data.currentLimit
            }
        })
    }
}

export const updateOvertimeRecord = (id, from, to, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {

            const body = {
                from: from,
                to: to,
                status: status,
            }

            const res = await axios.put(`/api/overtime/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/api/overtime', {
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
                type: UPDATE_OVERTIME_RECORD,
                payload: {
                    isUpdating: false,
                    record: res2.data.overtimeRecord,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.pageStart,
                    currentPageEnd: res2.data.pageEnd,
                    pageLength: res2.data.pageCount,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
            console.log(err)
        }
    }
}

export const updateBatchOvertimeRecord = (selectedRecord, from, to, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const body = {
                from: from,
                to: to,
                status: status,
                id: selectedRecord
            }

            const res = await axios.put('/api/overtime', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/overtime', {
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
                type: BATCH_UPDATE_OVERTIME,
                payload: {
                    isBatchUpdating: false,
                    record: res2.data.overtimeRecord,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.pageStart,
                    currentPageEnd: res2.data.pageEnd,
                    pageLength: res2.data.pageCount,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const createOvertimeRecord = (employee_id, starting, ending, date, status, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const body = {
                employee_id: employee_id,
                from: starting,
                to: ending,
                date: date,
                status: status ? 'approved' : 'pending'
            }
            const res = await axios.post('/api/overtime', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/overtime', {
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
                type: CREATE_OVERTIME,
                payload: {
                    isCreating: false,
                    record: res2.data.overtimeRecord,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.pageStart,
                    currentPageEnd: res2.data.pageEnd,
                    pageLength: res2.data.pageCount,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const deleteOvertime = (id, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/overtime/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/overtime', {
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
                type: DELETE_OVERTIME,
                payload: {
                    isDeleting: false,
                    record: res2.data.overtimeRecord,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.pageStart,
                    currentPageEnd: res2.data.pageEnd,
                    pageLength: res2.data.pageCount,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const batchDeleteOvertime = (selectedRecord, currentPage, currentLimit, queryText, queryStatus, queryDateFrom, queryDateTo, queryCheckinFrom, queryCheckinTo, queryCheckoutFrom, queryCheckoutTo) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/overtime/${selectedRecord.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/overtime', {
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
                type: BATCH_DELETE_OVERTIME,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.overtimeRecord,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.pageStart,
                    currentPageEnd: res2.data.pageEnd,
                    pageLength: res2.data.pageCount,
                    employeeList: res2.data.employeeList,
                    currentLimit: res2.data.currentLimit,
                    selectedRecord: [],
                    isAllSelected: false
                }
            })

            window.history.replaceState(null, null, '/overtime')
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateOvertime = (e, result) => {
    return (dispatch) => {
        try {
            let { name, value } = result || e.target
            if (e.target.type === 'checkbox') value = e.target.checked
            dispatch({
                type: UPDATE_OVERTIME,
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

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_SELECTED : REMOVE_FROM_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const toggleSelectAll = (e, entries) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_SELECTED : RESET_SELECTED,
            payload: {
                selectedRecord: e.target.checked ? entries = entries.map(el => el.id.toString()) : [],
                isAllSelected: e.target.checked
            }
        })
    }
}