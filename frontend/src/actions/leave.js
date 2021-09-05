import { FETCH_EMPLOYEE_AL, UPDATE_LEAVE, FETCH_LEAVE, FETCH_SPECIFIC_LEAVE, RESET_LEAVE, TOGGLE_LEAVE_VIEWING, TOGGLE_LEAVE_UPDATING, TOGGLE_LEAVE_DELETING, TOGGLE_LEAVE_CREATING, ADD_TO_LEAVE_SELECTED, REMOVE_FROM_LEAVE_SELECTED, ADD_ALL_TO_LEAVE_SELECTED, RESET_LEAVE_SELECTED, TOGGLE_LEAVE_FILTERING, RESET_QUERY, FETCH_LEAVE_BY_QUERY, TOGGLE_LEAVE_BATCH_UPDATING, TOGGLE_LEAVE_BATCH_DELETING } from "../types/leave";
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
            await axios.post('/leave', body)
            dispatch(resetLeave())
        } catch (err) {
            console.log(err.response.data.error)
        }
    }
}

export const createLeave = (employeeId, reason, from, to, type, duration) => {
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
            dispatch(fetchLeave())
            dispatch({ type: RESET_LEAVE })
            dispatch({ type: TOGGLE_LEAVE_CREATING })

        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchLeave = (page, from, to, type, status, text) => {
    return async (dispatch) => {
        try {
            if (!page) page = 0
            const res = await axios.get('/leave', {
                params: {
                    page: page,
                    from: from,
                    to: to,
                    type: type,
                    status: status,
                    text: text
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

export const resetLeave = () => {
    return (dispatch) => {
        dispatch({ type: RESET_LEAVE })
    }
}

export const confirmLeaveUpdate = (leaveId, duration, type, status) => {
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
            dispatch({
                type: TOGGLE_LEAVE_UPDATING,
                payload: {
                    isUpdating: false,
                    employeeId: "",
                    reason: "",
                    status: "",
                    duration: "",
                    from: "",
                    to: "",
                    firstname: "",
                    lastname: "",
                    leaveId: "",
                    type: ""
                }
            })
            dispatch(fetchLeave())
        } catch (err) {
            console.log(err)
        }
    }
}

export const confirmBatchLeaveUpdate = (leaveId, duration, type, status) => {
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
            dispatch(fetchLeave())
            dispatch({
                type: TOGGLE_LEAVE_BATCH_UPDATING,
                payload: {
                    isBatchUpdating: false,
                    batchUpdateDuration: "",
                    batchUpdateType: "",
                    batchUpdateStatus: ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return async (dispatch) => {
        dispatch({
            type: TOGGLE_LEAVE_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const deleteLeave = (leaveId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/leave/?ids=${leaveId}`)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchLeave())
            dispatch({
                type: TOGGLE_LEAVE_DELETING,
                payload: {
                    isDeleting: false,
                    employeeId: "",
                    reason: "",
                    status: "",
                    duration: "",
                    from: "",
                    to: "",
                    firstname: "",
                    lastname: "",
                    leaveId: "",
                    type: ""
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const batchDeleteLeave = (leaveId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/leave/${leaveId.map((el, i) => i === 0 ? `?ids=${el}` : `&ids=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))
            dispatch(fetchLeave())
            dispatch({
                type: TOGGLE_LEAVE_BATCH_DELETING,
                payload: {
                    isBatchDeleting: false
                }
            })
            dispatch({ type: RESET_LEAVE_SELECTED })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleViewing = (id) => {
    return async (dispatch) => {
        try {
            if (id) {
                const res = await axios.get(`/leave/${id}`)
                dispatch({
                    type: TOGGLE_LEAVE_VIEWING,
                    payload: {
                        isViewing: true,
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
            } else {
                dispatch({
                    type: TOGGLE_LEAVE_VIEWING,
                    payload: {
                        isViewing: false,
                        employeeId: "",
                        reason: "",
                        status: "",
                        duration: "",
                        from: "",
                        to: "",
                        firstname: "",
                        lastname: "",
                        leaveId: "",
                        type: ""
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleUpdating = (id) => {
    return async (dispatch) => {
        try {
            if (id) {
                const res = await axios.get(`/leave/${id}`)
                console.log(res.data)
                dispatch({
                    type: TOGGLE_LEAVE_UPDATING,
                    payload: {
                        isUpdating: true,
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
            } else {
                dispatch({
                    type: TOGGLE_LEAVE_UPDATING,
                    payload: {
                        isUpdating: false,
                        employeeId: "",
                        reason: "",
                        status: "",
                        duration: "",
                        from: "",
                        to: "",
                        firstname: "",
                        lastname: "",
                        leaveId: "",
                        type: ""
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return async (dispatch) => {
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
            if (id) {
                const res = await axios.get(`/leave/${id}`)
                dispatch({
                    type: TOGGLE_LEAVE_DELETING,
                    payload: {
                        isDeleting: true,
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
            } else {
                dispatch({
                    type: TOGGLE_LEAVE_DELETING,
                    payload: {
                        isDeleting: false,
                        employeeId: "",
                        reason: "",
                        status: "",
                        duration: "",
                        from: "",
                        to: "",
                        firstname: "",
                        lastname: "",
                        leaveId: "",
                        type: ""
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleCreating = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LEAVE_CREATING,
            payload: {
                isCreating: true
            }
        })
    }
}

export const toggleFiltering = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_LEAVE_FILTERING,
        })
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        if (e.target.checked) {
            dispatch({
                type: ADD_TO_LEAVE_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        } else {
            dispatch({
                type: REMOVE_FROM_LEAVE_SELECTED,
                payload: {
                    id: e.target.name
                }
            })
        }
    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        if (e.target.checked) {
            rows = rows.map(el => el.id.toString())
            dispatch({
                type: ADD_ALL_TO_LEAVE_SELECTED,
                payload: {
                    id: rows
                }
            })
        } else {
            dispatch({ type: RESET_LEAVE_SELECTED })
        }
    }
}

export const resetQuery = (currentPage, currentLimit) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/leave', {
                params: {
                    page: currentPage,
                    limit: currentLimit
                }
            })
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