import { ADD_ALL_TO_REIMBURSEMENT_SELECTED, ADD_TO_REIMBURSEMENT_SELECTED, BATCH_DELETE_REIMBURSEMENT, BATCH_UPDATE_REIMBURSEMENT, CREATE_REIMBURSEMENT, DELETE_REIMBURSEMENT, FETCH_REIMBURSEMENT, FETCH_REIMBURSEMENT_BY_QUERY, HANDLE_REIMBURSEMENT_CHANGE, REMOVE_ALL_FROM_REIMBURSEMENT_SELECTED, REMOVE_FROM_REIMBURSEMENT_SELECTED, RESET_REIMBURSEMENT, RESET_REIMBURSEMENT_QUERY, TOGGLE_REIMBURSEMENT_BATCH_DELETING, TOGGLE_REIMBURSEMENT_BATCH_UPDATING, TOGGLE_REIMBURSEMENT_CREATING, TOGGLE_REIMBURSEMENT_DELETING, TOGGLE_REIMBURSEMENT_FILTERING, TOGGLE_REIMBURSEMENT_UPDATING, UPDATE_REIMBURSEMENT } from "../types/reimbursement";
import axios from 'axios';
import { popSuccessMessage, popErrorMessage } from '../actions/ui'

export const fetchReimbursement = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/reimbursement')
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit,
                    employeeList: res.data.employeeList
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const fetchReimbursementByEntries = (currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const updateReimbursement = (id, reason, date, amount, status) => {
    return async (dispatch) => {
        try {
            const body = {
                status: status,
                reason: reason,
                date: date,
                amount: amount
            }
            const res = await axios.put(`/api/reimbursement/${id}`, body)
            dispatch(popSuccessMessage(res.data.success))

            dispatch({
                type: UPDATE_REIMBURSEMENT,
                payload: {
                    isUpdating: false,
                    id: res.data.reimbursement.id,
                    status: res.data.reimbursement.status,
                    reason: res.data.reimbursement.reason,
                    date: res.data.reimbursement.date,
                    amount: res.data.reimbursement.amount,
                    selectedRecord: []
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const gotoNextReimbursementPage = (currentPage, currentLimit, pageCount, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            if (currentPage + currentLimit >= pageCount) return;
            const res = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage + currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const gotoPreviousReimbursementPage = (currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            if (currentPage <= 0) return;
            const res = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage - currentLimit,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus
                }
            })
            dispatch({
                type: FETCH_REIMBURSEMENT,
                payload: {
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleCreating = (isCreating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_REIMBURSEMENT_CREATING,
            payload: {
                isCreating: !isCreating
            }
        })
    }
}

export const handleChange = (e) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_REIMBURSEMENT_CHANGE,
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }
}

export const createReimbursement = (employeeId, date, amount, reason, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const body = {
                employeeId: employeeId,
                date: date,
                amount: amount,
                reason: reason
            }

            const res = await axios.post('/api/reimbursement', body)

            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: CREATE_REIMBURSEMENT,
                payload: {
                    isCreating: false,
                    record: res2.data.reimbursement,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
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
            if (id) res = await axios.get(`/api/reimbursement/${id}`);
            dispatch({
                type: TOGGLE_REIMBURSEMENT_UPDATING,
                payload: {
                    isUpdating: id ? true : false,
                    id: id ? res.data.reimbursement.id : "",
                    employeeId: id ? res.data.reimbursement.employee_id : "",
                    reason: id ? res.data.reimbursement.reason : "",
                    status: id ? res.data.reimbursement.status : "",
                    amount: id ? res.data.reimbursement.amount : "",
                    date: id ? `${new Date(res.data.reimbursement.date).getFullYear()}-${new Date(res.data.reimbursement.date).toLocaleDateString('en-US', { month: "2-digit" })}-${new Date(res.data.reimbursement.date).toLocaleDateString('en-US', { day: "2-digit" })}` : "",
                    firstname: id ? res.data.reimbursement.firstname : "",
                    lastname: id ? res.data.reimbursement.lastname : ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleDeleting = (id) => {
    return async (dispatch) => {
        try {
            let res;
            if (id) res = await axios.get(`/api/reimbursement/${id}`);
            dispatch({
                type: TOGGLE_REIMBURSEMENT_DELETING,
                payload: {
                    isDeleting: id ? true : false,
                    id: id ? res.data.reimbursement.id : "",
                    employeeId: id ? res.data.reimbursement.employee_id : "",
                    reason: id ? res.data.reimbursement.reason : "",
                    status: id ? res.data.reimbursement.status : "",
                    amount: id ? res.data.reimbursement.amount : "",
                    date: id ? res.data.reimbursement.date : "",
                    firstname: id ? res.data.reimbursement.firstname : "",
                    lastname: id ? res.data.reimbursement.lastname : ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const deleteReimbursement = (id, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/reimbursement/${id}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: DELETE_REIMBURSEMENT,
                payload: {
                    isDeleting: false,
                    record: res2.data.reimbursement,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleFiltering = (isFiltering) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_REIMBURSEMENT_FILTERING,
            payload: {
                isFiltering: !isFiltering
            }
        })
    }
}

export const fetchReimbursementByQuery = (queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/reimbursement', {
                params: {
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: FETCH_REIMBURSEMENT_BY_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit,
                    employeeList: res.data.employeeList
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const resetReimbursementQuery = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/reimbursement');
            dispatch({
                type: RESET_REIMBURSEMENT_QUERY,
                payload: {
                    isFiltering: false,
                    record: res.data.reimbursement,
                    currentPage: res.data.currentPage,
                    currentPageStart: res.data.currentPageStart,
                    currentPageEnd: res.data.currentPageEnd,
                    pageLength: res.data.pageLength,
                    currentLimit: res.data.currentLimit,
                    employeeList: res.data.employeeList
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const handleSelect = (e) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_TO_REIMBURSEMENT_SELECTED : REMOVE_FROM_REIMBURSEMENT_SELECTED,
            payload: {
                id: e.target.name
            }
        })

    }
}

export const handleSelectAll = (e, rows) => {
    return (dispatch) => {
        dispatch({
            type: e.target.checked ? ADD_ALL_TO_REIMBURSEMENT_SELECTED : REMOVE_ALL_FROM_REIMBURSEMENT_SELECTED,
            payload: {
                id: e.target.checked ? rows.map(el => el.id.toString()) : []
            }
        })
    }
}

export const toggleBatchUpdating = (isBatchUpdating) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_REIMBURSEMENT_BATCH_UPDATING,
            payload: {
                isBatchUpdating: !isBatchUpdating
            }
        })
    }
}

export const batchUpdateReimbursement = (selectedRecord, updateReimbursementAmount, updateReimbursementDate, updateReimbursementStatus, updateReimbursementReason) => {
    return async (dispatch) => {
        try {
            const body = {
                id: selectedRecord,
                amount: updateReimbursementAmount,
                date: updateReimbursementDate,
                reason: updateReimbursementReason,
                status: updateReimbursementStatus
            }

            const res = await axios.put('/api/reimbursement', body)
            dispatch(popSuccessMessage(res.data.success))
            dispatch({
                type: BATCH_UPDATE_REIMBURSEMENT,
                payload: {
                    isBatchUpdating: false,
                    update: res.data.update,
                    updateReimbursementAmount: "",
                    updateReimbursementDate: "",
                    updateReimbursementStatus: "",
                    updateReimbursementReason: ""
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}

export const toggleBatchDeleting = (isBatchDeleting) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_REIMBURSEMENT_BATCH_DELETING,
            payload: {
                isBatchDeleting: !isBatchDeleting
            }
        })
    }
}

export const batchDeleteReimbursement = (selectedRecord, currentPage, currentLimit, queryText, queryAmountFrom, queryAmountTo, queryDateFrom, queryDateTo, queryStatus) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/api/reimbursement/${selectedRecord.map((el, i) => i === 0 ? `?id=${el}` : `&id=${el}`).join("")}`)
            dispatch(popSuccessMessage(res.data.success))

            const res2 = await axios.get('/api/reimbursement', {
                params: {
                    page: currentPage,
                    limit: currentLimit,
                    text: queryText,
                    amountFrom: queryAmountFrom,
                    amountTo: queryAmountTo,
                    dateFrom: queryDateFrom,
                    dateTo: queryDateTo,
                    status: queryStatus
                }
            })

            dispatch({
                type: BATCH_DELETE_REIMBURSEMENT,
                payload: {
                    isBatchDeleting: false,
                    record: res2.data.reimbursement,
                    currentPage: res2.data.currentPage,
                    currentPageStart: res2.data.currentPageStart,
                    currentPageEnd: res2.data.currentPageEnd,
                    pageLength: res2.data.pageLength,
                    currentLimit: res2.data.currentLimit,
                    selectedRecord: []
                }
            })
        } catch (err) {
            dispatch(popErrorMessage(err.response.data.error))
        }
    }
}