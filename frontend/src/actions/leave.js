import { DELETE_LEAVE, FETCH_EMPLOYEE_AL, UPDATE_LEAVE, FETCH_LEAVE, FETCH_SPECIFIC_LEAVE, RESET_LEAVE, TOGGLE_LEAVE_VIEWING, TOGGLE_LEAVE_UPDATING, TOGGLE_LEAVE_DELETING, TOGGLE_LEAVE_CREATING, ADD_TO_LEAVE_SELECTED, REMOVE_FROM_LEAVE_SELECTED, ADD_ALL_TO_LEAVE_SELECTED, RESET_LEAVE_SELECTED, TOGGLE_LEAVE_FILTERING, RESET_QUERY, FETCH_LEAVE_BY_QUERY, TOGGLE_LEAVE_BATCH_UPDATING, TOGGLE_LEAVE_BATCH_DELETING, APPLY_LEAVE, CREATE_LEAVE, BATCH_DELETE_LEAVE, CONFIRM_UPDATE_LEAVE, BATCH_UPDATE_LEAVE } from "../types/leave";
import axios from 'axios'
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchEmployeeAl = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/employee/${id}`)
            dispatch({
                type: FETCH_EMPLOYEE_AL,
                payload: {
                    employeeAL: res.data.employee.annual_leave_count
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateLeave = (e, result) => {
    return (dispatch) => {
        const { name, value } = result || e.target
        dispatch({
            type: UPDATE_LEAVE,
            payload: {
                name: name,
                value: value
            }
        })
    }
}

export const applyLeave = (employeeId, reason, from, to, type, duration) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                from: from,
                to: to,
                duration: duration,
                type: type
            }
            const res = await axios.post('/leave', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: APPLY_LEAVE,
                payload: {
                    applyFrom: "",
                    applyTo: "",
                    applyType: "",
                    applySpan: "",
                    applyReason: "",
                    applyEmployee: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const createLeave = (employeeId, reason, from, to, type, duration, currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                reason: reason,
                from: from,
                to: to,
                duration: duration,
                type: type
            }
            const res = await axios.post('/leave', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    from: queryFrom,
                    to: queryTo,
                    status: queryStatus,
                    text: queryText,
                    type: queryType,

                }
            })
            dispatch({
                type: CREATE_LEAVE,
                payload: {
                    isCreating: false,
                    record: res2.data.leave,
                    employeeList: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    applyFrom: "",
                    applyTo: "",
                    applyType: "",
                    applySpan: "",
                    applyReason: "",
                    applyEmployee: "",
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchLeave = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/leave')
            dispatch({
                type: FETCH_LEAVE,
                payload: {
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchSpecificLeave = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/leave/${id}`)
            dispatch({
                type: FETCH_SPECIFIC_LEAVE,
                payload: {
                    employeeId: res.data.leave.employee_id,
                    reason: res.data.leave.reason,
                    status: res.data.leave.status,
                    duration: res.data.leave.duration,
                    from: res.data.leave.from,
                    to: res.data.leave.to,
                    firstname: res.data.leave.firstname,
                    lastname: res.data.leave.lastname,
                    leaveId: res.data.leave.id,
                    type: res.data.leave.type
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmLeaveUpdate = (leaveId, duration, type, status, currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            leaveId = [leaveId]
            const body = {
                duration: duration,
                type: type,
                status: status,
                ids: leaveId
            }
            const res = await axios.put('/leave', body)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    from: queryFrom,
                    to: queryTo,
                    status: queryStatus,
                    text: queryText,
                    type: queryType,

                }
            })

            dispatch({
                type: CONFIRM_UPDATE_LEAVE,
                payload: {
                    isUpdating: false,
                    record: res2.data.leave,
                    employeeList: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmBatchLeaveUpdate = (leaveId, duration, type, status, currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            const body = {
                ids: leaveId,
                duration: duration,
                type: type,
                status: status
            }
            const res = await axios.put('/leave', body)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    from: queryFrom,
                    to: queryTo,
                    status: queryStatus,
                    text: queryText,
                    type: queryType,

                }
            })
            dispatch({
                type: BATCH_UPDATE_LEAVE,
                payload: {
                    isBatchUpdating: false,
                    record: res2.data.leave,
                    employeeList: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return async (dispatch) => {
        if (isBatchDeleting) {
            window.history.replaceState(null, null, '/leave/management')
        } else {
            window.history.replaceState(null, null, '/leave/management/batchdelete')
        }
        dispatch({
            type: TOGGLE_LEAVE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const deleteLeave = (leaveId, currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/leave/?ids=${leaveId}`)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    from: queryFrom,
                    to: queryTo,
                    status: queryStatus,
                    text: queryText,
                    type: queryType,

                }
            })
            dispatch({
                type: DELETE_LEAVE,
                payload: {
                    isDeleting: false,
                    record: res2.data.leave,
                    employeeList: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const batchDeleteLeave = (leaveId, currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/leave/${leaveId.map((el, i) => i === 0 ? `?ids=${el}` : `&ids=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))
            const res2 = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    from: queryFrom,
                    to: queryTo,
                    status: queryStatus,
                    text: queryText,
                    type: queryType,

                }
            })
            dispatch({
                type: BATCH_DELETE_LEAVE,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.leave,
                    employeeList: res2.data.employee,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleViewing = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/leave/${id}`)
                window.history.replaceState(null, null, `/leave/management/${id}/details`)
            } else {
                window.history.replaceState(null, null, `/leave/management`)
            }
            dispatch({
                type: TOGGLE_LEAVE_VIEWING,
                payload: {
                    isViewing: id ? true : false,
                    employeeId: id ? res.data.leave.employee_id : "",
                    reason: id ? res.data.leave.reason : "",
                    status: id ? res.data.leave.status : "",
                    duration: id ? res.data.leave.duration : "",
                    from: id ? res.data.leave.from : "",
                    to: id ? res.data.leave.to : "",
                    firstname: id ? res.data.leave.firstname : "",
                    lastname: id ? res.data.leave.lastname : "",
                    leaveId: id ? res.data.leave.id : "",
                    type: id ? res.data.leave.type : ""
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
            let res;
            if (id) {
                res = await axios.get(`/leave/${id}`)
                window.history.replaceState(null, null, `/leave/management/${id}/update`)
            } else {
                window.history.replaceState(null, null, '/leave/management')
            }
            dispatch({
                type: TOGGLE_LEAVE_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    employeeId: id ? res.data.leave.employee_id : "",
                    reason: id ? res.data.leave.reason : "",
                    status: id ? res.data.leave.status : "",
                    duration: id ? res.data.leave.duration : "",
                    from: id ? res.data.leave.from : "",
                    to: id ? res.data.leave.to : "",
                    firstname: id ? res.data.leave.firstname : "",
                    lastname: id ? res.data.leave.lastname : "",
                    leaveId: id ? res.data.leave.id : "",
                    type: id ? res.data.leave.type : ""
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return async (dispatch) => {
        if (isBatchUpdating) {
            window.history.replaceState(null, null, '/leave/management')
        } else {
            window.history.replaceState(null, null, '/leave/management/batchupdate')
        }

        dispatch({
            type: TOGGLE_LEAVE_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating,
                batchUpdateDuration: "",
                batchUpdateType: "",
                batchUpdateStatus: ""
            }
        })
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) {
                res = await axios.get(`/leave/${id}`)
                window.history.replaceState(null, null, `/leave/management/${id}/delete`)
            } else {
                window.history.replaceState(null, null, '/leave/management')
            }
            dispatch({
                type: TOGGLE_LEAVE_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    employeeId: id ? res.data.leave.employee_id : "",
                    reason: id ? res.data.leave.reason : "",
                    status: id ? res.data.leave.status : "",
                    duration: id ? res.data.leave.duration : "",
                    from: id ? res.data.leave.from : "",
                    to: id ? res.data.leave.to : "",
                    firstname: id ? res.data.leave.firstname : "",
                    lastname: id ? res.data.leave.lastname : "",
                    leaveId: id ? res.data.leave.id : "",
                    type: id ? res.data.leave.type : ""
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
            window.history.replaceState(null, null, '/leave/management')
        } else {
            window.history.replaceState(null, null, '/leave/management/create')
        }
        dispatch({
            type: TOGGLE_LEAVE_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        if (isFiltering) {
            window.history.replaceState(null, null, '/leave/management')
        } else {
            window.history.replaceState(null, null, '/leave/management/search')
        }
        dispatch({
            type: TOGGLE_LEAVE_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_LEAVE_SELECTED : REMOVE_FROM_LEAVE_SELECTED,
            payload: {
                id: e.target.name
            }
        })
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_LEAVE_SELECTED : RESET_LEAVE_SELECTED,
            payload: {
                id: e.target.checked ? rows = rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const resetQuery = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/leave')
            dispatch({
                type: RESET_QUERY,
                payload: {
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchLeaveByQuery = (queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/leave', {
                params: {
                    text: queryText,
                    from: queryFrom,
                    to: queryTo,
                    type: queryType,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_LEAVE_BY_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchNextLeaveRecord = (currentPage, pageLength, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            if (currentPage + currentLimit >= pageLength) return;
            const res = await axios.get('/leave', {
                params: {
                    page: currentPage + currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    from: queryFrom,
                    to: queryTo,
                    type: queryType,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_LEAVE,
                payload: {
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const fetchPreviousLeaveRecord = (currentPage, currentLimit, queryText, queryFrom, queryTo, queryType, queryStatus) => {
    return async (dispatch) => {
        try {
            if (currentPage <= 0) return;
            const res = await axios.get('/leave', {
                params: {
                    page: currentPage - currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    from: queryFrom,
                    to: queryTo,
                    type: queryType,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_LEAVE,
                payload: {
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const handleEntriesChange = (queryText, queryFrom, queryTo, queryType, queryStatus, currentPage, newLimit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: newLimit,
                    text: queryText,
                    from: queryFrom,
                    to: queryTo,
                    type: queryType,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_LEAVE,
                payload: {
                    record: res.data.leave,
                    employeeList: res.data.employee,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}